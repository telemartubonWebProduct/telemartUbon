import type { Metadata } from "next";

import { pageTitle } from "@/components/admin/styles";
import { requireActiveAdmin } from "@/lib/auth/access";

export const metadata: Metadata = { title: "ภาพรวม" };

const upcoming = [
  { label: "แก้ไขหน้าเว็บแบบเห็นหน้าจริง (Mirror Editor)", milestone: "M3" },
  { label: "แพ็กเกจ บริการ และคลังสื่อ", milestone: "M2–M3" },
  { label: "เผยแพร่ ประวัติการแก้ไข และย้อนกลับ", milestone: "M4" },
  { label: "คำขอให้ติดต่อกลับและรายงาน", milestone: "M5" },
];

export default async function AdminOverviewPage() {
  const access = await requireActiveAdmin();

  return (
    <>
      <header className="border-b border-tm-line pb-6">
        <h1 className={pageTitle}>ภาพรวม</h1>
        <p className="mt-2 text-tm-muted">
          เข้าสู่ระบบในชื่อ <span className="font-medium text-tm-ink">{access.email}</span>
        </p>
      </header>

      <section aria-labelledby="access-heading" className="mt-10">
        <h2 id="access-heading" className="text-tm-h4 font-semibold">
          สิทธิ์ของบัญชีนี้
        </h2>
        <dl className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-[11rem_minmax(0,1fr)]">
          <dt className="text-tm-small font-semibold text-tm-muted">บทบาท</dt>
          <dd>ผู้ดูแล (Admin) — ใช้งานอยู่</dd>
          <dt className="text-tm-small font-semibold text-tm-muted">การตรวจสิทธิ์</dt>
          <dd>
            ตรวจกับฐานข้อมูลทุกครั้งที่เปิดหน้าและทุกคำสั่งบันทึก หากสิทธิ์ถูกปิด
            การเข้าถึงจะหยุดในคำขอถัดไปทันที
          </dd>
        </dl>
      </section>

      <section aria-labelledby="next-heading" className="mt-12">
        <h2 id="next-heading" className="text-tm-h4 font-semibold">
          เครื่องมือที่จะเปิดในขั้นถัดไป
        </h2>
        <ul className="mt-4 divide-y divide-tm-line border-y border-tm-line">
          {upcoming.map((item) => (
            <li key={item.label} className="flex items-baseline justify-between gap-6 py-3">
              <span>{item.label}</span>
              <span className="shrink-0 text-tm-small text-tm-muted">{item.milestone}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
