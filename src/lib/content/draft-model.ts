import { documentSchema, isDocumentId, readDocument, writeDocument, type DocumentId } from "./documents";
import type { SiteContent } from "./schema";
import { contentProblems } from "./validate";

// How drafts become content: pure functions shared by the server (loading the
// editor, validating a save) and the unit tests. Database access lives in
// drafts.ts.

/** Version of the content schema that drafts are written for. */
export const CONTENT_SCHEMA_VERSION = 1;

export type DraftRecord = {
  documentId: DocumentId;
  schemaVersion: number;
  body: unknown;
  revision: number;
  updatedAt: string;
  updatedBy: string | null;
};

/** A stored draft that cannot be applied, with the reasons in Thai for the editor. */
export type DraftProblem = { documentId: string; messages: string[] };

function issueMessages(error: { issues: { path: PropertyKey[]; message: string }[] }): string[] {
  return error.issues.map((issue) => (issue.path.length ? `${issue.path.map(String).join(".")}: ${issue.message}` : issue.message));
}

/** Parses one document body against its schema. */
export function parseDocument(documentId: DocumentId, body: unknown): { ok: true; value: unknown } | { ok: false; messages: string[] } {
  const result = documentSchema(documentId).safeParse(body);
  return result.success ? { ok: true, value: result.data } : { ok: false, messages: issueMessages(result.error) };
}

/**
 * The content an Admin sees in the editor: the published content with every
 * valid draft applied. Drafts that no longer fit (an unknown document, another
 * schema version, a body the schema rejects, or references that break) are
 * left out and reported, so one bad draft cannot break the whole preview.
 */
export function applyDrafts(published: SiteContent, drafts: readonly DraftRecord[]): { content: SiteContent; problems: DraftProblem[] } {
  let content = published;
  const problems: DraftProblem[] = [];
  for (const draft of drafts) {
    if (!isDocumentId(draft.documentId) || readDocument(published, draft.documentId) === undefined) {
      problems.push({ documentId: draft.documentId, messages: ["ไม่มีเอกสารนี้ในเนื้อหาที่เผยแพร่แล้ว"] });
      continue;
    }
    if (draft.schemaVersion !== CONTENT_SCHEMA_VERSION) {
      problems.push({ documentId: draft.documentId, messages: [`ร่างนี้เขียนด้วยโครงสร้างรุ่น ${draft.schemaVersion}`] });
      continue;
    }
    const parsed = parseDocument(draft.documentId, draft.body);
    if (!parsed.ok) {
      problems.push({ documentId: draft.documentId, messages: parsed.messages });
      continue;
    }
    const next = writeDocument(content, draft.documentId, parsed.value);
    const broken = contentProblems(next);
    if (broken.length > 0) {
      problems.push({ documentId: draft.documentId, messages: broken });
      continue;
    }
    content = next;
  }
  return { content, problems };
}

/**
 * Checks a document the editor wants to save, in the context of every other
 * draft: the schema of the document, then the references across the site.
 */
export function validateDraft(
  current: SiteContent,
  documentId: DocumentId,
  body: unknown,
): { ok: true; value: unknown } | { ok: false; messages: string[] } {
  if (readDocument(current, documentId) === undefined) return { ok: false, messages: ["ไม่มีเอกสารนี้ในเนื้อหาของเว็บ"] };
  const parsed = parseDocument(documentId, body);
  if (!parsed.ok) return parsed;
  const broken = contentProblems(writeDocument(current, documentId, parsed.value));
  return broken.length > 0 ? { ok: false, messages: broken } : parsed;
}
