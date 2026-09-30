import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { content, getMedia } from "@/lib/content";

import "@/styles/tokens.css";
import "./globals.css";

// Shown for any unknown URL, in either language: the request carries no
// usable locale, so the page speaks both. Its links are full page loads (a
// different root layout), so they are not prefetched.
const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-plex-thai",
});

export const metadata: Metadata = {
  title: "ไม่พบหน้านี้ | Page not found",
};

export default function GlobalNotFound() {
  const logo = getMedia(content.site.brand.logo);
  return (
    <html lang="th" className={plexThai.variable}>
      <body className="tm-site">
        <header className="border-b border-tm-line">
          <div className="tm-container flex h-16 items-center">
            <Link href="/" prefetch={false} className="rounded-tm-control">
              <Image src={logo.src} width={logo.width} height={logo.height} alt={content.site.brand.name.th} className="h-9 w-auto" />
            </Link>
          </div>
        </header>
        <main className="tm-container grid gap-12 py-16 md:grid-cols-2 lg:py-24">
          <section>
            <h1 className="text-tm-h1 font-semibold">ไม่พบหน้านี้</h1>
            <p className="mt-3 max-w-[30rem] text-tm-muted">ลิงก์อาจพิมพ์ผิด หรือหน้านี้ถูกย้ายไปแล้ว ดูแพ็กเกจทั้งหมดได้จากหน้าแรก</p>
            <Link href="/" prefetch={false} className="tm-button tm-button-primary mt-6">
              ไปหน้าแรก
            </Link>
          </section>
          <section lang="en">
            <h2 className="text-tm-h1 font-semibold">Page not found</h2>
            <p className="mt-3 max-w-[30rem] text-tm-muted">The link may be mistyped, or the page has moved. Every package is linked from the home page.</p>
            <Link href="/en" prefetch={false} className="tm-button tm-button-secondary mt-6">
              Go to the home page
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
