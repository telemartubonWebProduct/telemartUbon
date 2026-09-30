import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/database.types";

import { isDocumentId, type DocumentId } from "./documents";
import { applyDrafts, CONTENT_SCHEMA_VERSION, validateDraft, type DraftProblem, type DraftRecord, type FieldIssue } from "./draft-model";
import type { SiteContent } from "./schema";

// Drafts in Supabase (supabase/migrations/20260930160641_content_drafts.sql).
// Every call runs with the signed-in Admin's session, so RLS decides access:
// anyone else reads nothing and cannot write.

type Client = SupabaseClient<Database>;

export type SaveOutcome =
  | { ok: true; revision: number; updatedAt: string }
  | { ok: false; reason: "conflict"; current: DraftRecord | null }
  | { ok: false; reason: "invalid"; messages: string[]; issues: FieldIssue[] }
  | { ok: false; reason: "denied" | "error"; message: string };

export type DiscardOutcome = { ok: true } | Exclude<SaveOutcome, { ok: true } | { reason: "invalid" }>;

type Row = Database["public"]["Tables"]["content_drafts"]["Row"];

function toRecord(row: Row): DraftRecord | null {
  if (!isDocumentId(row.document_id)) return null;
  return {
    documentId: row.document_id,
    schemaVersion: row.schema_version,
    body: row.body,
    revision: row.revision,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by,
  };
}

export async function readDrafts(supabase: Client): Promise<DraftRecord[]> {
  const { data, error } = await supabase
    .from("content_drafts")
    .select("document_id, schema_version, body, revision, updated_at, updated_by, created_at")
    .order("document_id");
  if (error) throw new Error(`Could not read drafts (${error.code ?? "unknown"})`);
  return data.flatMap((row) => toRecord(row) ?? []);
}

async function readDraft(supabase: Client, documentId: DocumentId): Promise<DraftRecord | null> {
  const { data } = await supabase
    .from("content_drafts")
    .select("document_id, schema_version, body, revision, updated_at, updated_by, created_at")
    .eq("document_id", documentId)
    .maybeSingle();
  return data ? toRecord(data) : null;
}

/** The editor's working content: published content plus the valid drafts. */
export async function loadDraftContent(
  supabase: Client,
  published: SiteContent,
): Promise<{ content: SiteContent; drafts: DraftRecord[]; problems: DraftProblem[] }> {
  const drafts = await readDrafts(supabase);
  return { ...applyDrafts(published, drafts), drafts };
}

function failure(error: { code?: string; message?: string }): SaveOutcome & { ok: false } {
  if (error.code === "42501") return { ok: false, reason: "denied", message: "บัญชีนี้ไม่มีสิทธิ์แก้ไขเนื้อหา" };
  if (error.code === "23514") return { ok: false, reason: "invalid", messages: ["ฐานข้อมูลไม่รับเนื้อหานี้ (รูปแบบหรือขนาดเกินกำหนด)"], issues: [] };
  return { ok: false, reason: "error", message: "บันทึกไม่สำเร็จ ลองอีกครั้ง" };
}

/**
 * Saves one document if it is still at `expectedRevision` (0 = no draft yet).
 * The body is validated against its schema and against the rest of the site
 * (with the other drafts applied) before it reaches the database.
 */
export async function saveDraft(
  supabase: Client,
  published: SiteContent,
  documentId: DocumentId,
  expectedRevision: number,
  body: unknown,
): Promise<SaveOutcome> {
  const { content } = await loadDraftContent(supabase, published);
  const checked = validateDraft(content, documentId, body);
  if (!checked.ok) return { ok: false, reason: "invalid", messages: checked.messages, issues: checked.issues };

  const { data, error } = await supabase
    .rpc("save_content_draft", {
      p_document_id: documentId,
      p_expected_revision: expectedRevision,
      p_schema_version: CONTENT_SCHEMA_VERSION,
      p_body: checked.value as Database["public"]["Tables"]["content_drafts"]["Insert"]["body"],
    })
    .single();
  if (error) {
    if (error.code === "PT409") return { ok: false, reason: "conflict", current: await readDraft(supabase, documentId) };
    return failure(error);
  }
  return { ok: true, revision: data.revision, updatedAt: data.updated_at };
}

/** Throws a draft away so the document shows the published content again. */
export async function discardDraft(supabase: Client, documentId: DocumentId, expectedRevision: number): Promise<DiscardOutcome> {
  const { error } = await supabase.rpc("discard_content_draft", {
    p_document_id: documentId,
    p_expected_revision: expectedRevision,
  });
  if (!error) return { ok: true };
  if (error.code === "PT409") return { ok: false, reason: "conflict", current: await readDraft(supabase, documentId) };
  const result = failure(error);
  return result.reason === "invalid" ? { ok: false, reason: "error", message: result.messages[0] } : result;
}
