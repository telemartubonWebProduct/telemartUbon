# ฟอนต์ของเว็บ

ฟอนต์ทั้งสองแบบเก็บใน repo และนิยามที่เดียวใน [`index.ts`](index.ts) (`next/font/local`) ทุก root layout ใช้ไฟล์นี้: หน้าเว็บ `src/app/[locale]/layout.tsx`, หลังบ้าน `src/app/admin/layout.tsx` และหน้า 404 `src/app/global-not-found.tsx` ชื่อ CSS variable คงเดิม `--font-plex-thai` และ `--font-anuphan`

เหตุที่ย้ายจาก `next/font/google`: Next 16.3.7 (Turbopack) ทำ build ล้มเป็นบางครั้งด้วย `next/font/google queries have exactly one entry` เพราะรับลิงก์ stylesheet ของ Google ที่มี query string ไม่ได้ (เจอบน CI ของ `main` วันที่ 1 ต.ค. 2026 จำลองซ้ำได้ด้วย `NEXT_FONT_GOOGLE_MOCKED_RESPONSES`) ตอนนี้ build ไม่ต้องต่อ Google Fonts แล้ว

## IBM Plex Sans Thai (ตัวเนื้อหา) — `ibm-plex-sans-thai/`

- ที่มา: npm package ทางการของ IBM [`@ibm/plex-sans-thai@1.1.0`](https://www.npmjs.com/package/@ibm/plex-sans-thai) (repo `github.com/ibm/plex`) ไฟล์ `fonts/complete/woff2/` น้ำหนัก Regular 400, Medium 500 และ SemiBold 600 (ไม่ใส่ Bold 700 เพราะเว็บไม่ได้ใช้ 700 กับฟอนต์นี้ — หัวเรื่องตัวหนาเป็น Anuphan — ถ้ามีข้อความขอ 700 เบราว์เซอร์จะใช้ SemiBold แทน ถ้าจะใช้ตัวหนาจริงให้เพิ่มไฟล์ Bold ของ IBM กลับเข้ามา)
- License: SIL OFL 1.1 พร้อม **Reserved Font Name "Plex"** (`LICENSE.txt`) จึง **ห้าม subset หรือแก้ไฟล์** — ถ้าแก้ต้องเปลี่ยนชื่อฟอนต์ ใช้ไฟล์ของ IBM ตามที่ได้มาเท่านั้น
- ไฟล์มีทั้งอักษรไทยและละติน (ราว 40 kB ต่อน้ำหนัก)

| ไฟล์ | SHA-256 |
| --- | --- |
| IBMPlexSansThai-Regular.woff2 | `0350508969dad82ffd2b7608d8299454bf19ec54e464a16a66e5a9733e83654d` |
| IBMPlexSansThai-Medium.woff2 | `8249537de3768f46ce7b04e9e832c47f3ffa84900bdac2b18968d431d8814c61` |
| IBMPlexSansThai-SemiBold.woff2 | `83f9d86c099e0006077854cac1cf6f9d3177fb0c4f356254a7d56d047c097e52` |

อัปเดต: `npm pack @ibm/plex-sans-thai@<version>` แล้วคัดลอก 3 ไฟล์จาก `package/fonts/complete/woff2/` และ `package/LICENSE.txt` มาแทน

## Anuphan (หัวเรื่อง ราคา ความเร็ว) — `anuphan/`

- ที่มา: ไฟล์ variable ของผู้ออกแบบ Cadson Demak [`Fonts/variable/Anuphan[wght].ttf`](https://github.com/cadsondemak/Anuphan) ที่ commit `a8ee8448324cc13fb69d585c4f6da4994f7652b0` (commit เดียวกับที่ Google Fonts ใช้) SHA-256 ของต้นฉบับ `7ec47ebcaa9d6459d974691cbb42fae52e1449478a607b071bfaf3ccdb433ce4`
- License: SIL OFL 1.1 **ไม่มี Reserved Font Name** (`OFL.txt`) จึงตัดให้เล็กลงได้
- ไฟล์ในเว็บ `Anuphan-Thai-Latin-wght500-700.woff2` (43.5 kB, SHA-256 `ab92d342f24ee2a82bfa6ca71bf15fd9c1d6eea3f5301ee1b163626866817ec1`) ตัดเหลือแกนน้ำหนัก 500–700 ที่เว็บใช้ และอักษรชุดเดียวกับ subset `thai` + `latin` ที่ Google Fonts ส่งให้เว็บก่อนย้าย (ต้นฉบับ woff2 เต็มของผู้ออกแบบ 91 kB) อักษรนอกชุดนี้จะแสดงด้วย IBM Plex Sans Thai แทน

สร้างใหม่ (fontTools 4.60.1 + brotli ใน virtualenv แยก ไม่ต้องลงในโปรเจกต์):

```bash
pip install fonttools==4.60.1 brotli
fonttools varLib.instancer "Anuphan[wght].ttf" wght=500:700 -o anuphan-500-700.ttf
pyftsubset anuphan-500-700.ttf --layout-features='*' --flavor=woff2 \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02D7,U+02DA,U+02DC,U+0303,U+0304,U+0308,U+0329,U+0331,U+0E01-0E5B,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+25CC,U+FEFF,U+FFFD" \
  --output-file=Anuphan-Thai-Latin-wght500-700.woff2
```
