import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PreviewCanvas } from "@/components/editor/PreviewCanvas";
import { isChannel } from "@/components/editor/protocol";
import { requireActiveAdmin } from "@/lib/auth/access";
import { content } from "@/lib/content";
import { isPageDocumentId } from "@/lib/content/documents";
import { loadDraftContent } from "@/lib/content/drafts";
import { isLocale } from "@/lib/i18n/locales";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "ตัวอย่างหน้าเว็บ" };

// A page of the site with the saved drafts applied, for Admins only. The
// session and the Admin membership are checked on every request and the drafts
// are read through RLS; responses are private and never cached (src/proxy.ts).
export default async function PreviewPage({ params, searchParams }: PageProps<"/admin/preview/[locale]/[page]">) {
  const { locale, page } = await params;
  if (!isLocale(locale) || !isPageDocumentId(page)) notFound();
  await requireActiveAdmin(`/admin/preview/${locale}/${page}`);

  const { channel } = await searchParams;
  const { content: working } = await loadDraftContent(await createClient(), content);
  return <PreviewCanvas initialContent={working} initialPage={page} initialLocale={locale} channel={isChannel(channel) ? channel : null} />;
}
