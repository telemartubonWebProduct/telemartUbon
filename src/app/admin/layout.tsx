import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";

import { readSupabasePublicEnv } from "@/lib/env";

const plexThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex-thai",
});

export const metadata: Metadata = {
  title: {
    default: "หลังบ้าน Telemart Ubon",
    template: "%s · หลังบ้าน Telemart Ubon",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${plexThai.variable} tm-admin`}>
      {readSupabasePublicEnv() ? children : <SupabaseNotConfigured />}
    </div>
  );
}

function SupabaseNotConfigured() {
  return (
    <main className="px-tm-gutter py-16">
      <div className="mx-auto max-w-[34rem]">
        <h1 className="text-tm-h3 font-semibold">หลังบ้านยังไม่ได้เชื่อมต่อ Supabase</h1>
        <p className="mt-3 text-tm-muted">
          ตั้งค่า <code>NEXT_PUBLIC_SUPABASE_URL</code> และ <code>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code>{" "}
          ใน environment ของเว็บไซต์ แล้ว build ใหม่ ดูตัวอย่างใน <code>.env.example</code>
        </p>
      </div>
    </main>
  );
}
