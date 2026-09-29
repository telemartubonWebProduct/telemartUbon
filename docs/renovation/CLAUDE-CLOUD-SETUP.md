# ตั้งค่า Claude Cloud สำหรับ Telemart Ubon

ตรวจเอกสารทางการวันที่ 29 กันยายน 2026 เอกสารนี้เป็นค่าที่แนะนำและวิธีส่งต่องาน **ยังไม่ได้สร้างหรือบันทึก cloud environment, ใส่ credentials หรือเริ่ม cloud session ให้ผู้ใช้** Repo มี `scripts/cloud/setup.sh`, `.env.example`, SessionStart hook และ handoff แยกแล้ว

## ค่าที่กรอกใน Add cloud environment

| ช่อง | ค่าที่แนะนำ |
| --- | --- |
| Name | `Telemart Ubon Renovation Dev` |
| Network access | `Trusted` สำหรับติดตั้ง npm และตรวจโค้ดรอบแรก |
| Environment variables | ใช้ block ด้านล่าง เริ่มจากค่าที่ไม่มี secrets |
| Setup script | `bash scripts/cloud/setup.sh` จาก repository root |

Environment variables ที่คัดลอกได้ทันที:

```dotenv
NEXT_TELEMETRY_DISABLED=1
CI=true
NEXT_PUBLIC_SUPABASE_URL=https://wdcbbjvxrcxuaabcipqo.supabase.co
```

อย่าตั้ง `NODE_ENV=production` ใน environment เตรียมงานนี้ เพราะต้องติดตั้ง dev dependencies ด้วย ให้คำสั่ง dev/build เลือก mode ตามหน้าที่ URL Supabase คือ project ของผู้ใช้ที่ตรวจผ่าน MCP แล้ว (`wdcbbjvxrcxuaabcipqo`) การเชื่อมแอปยังต้องเติม publishable client key ตามชื่อที่ implementation ใช้จริง โดยไม่พิมพ์ secret/service-role key ลงเอกสาร

ช่องนี้ใช้รูปแบบ `.env` และผู้ใช้ environment อ่านค่าทั้งหมดได้ การเปลี่ยนค่ามีผลกับ session ใหม่ สำหรับ Pro/Max ให้เพิ่ม API credentials จากหน้าต่าง **Edit หลังสร้าง environment แล้ว** ถ้า API รองรับ proxy injection; key แบบนี้ไม่เข้า VM และไม่ใช้กับ request จาก setup script ดู [คำอธิบาย environment variables/API credentials ทางการ](https://code.claude.com/docs/en/cloud-environments#set-environment-variables)

เก็บ secret ของ Supabase/server, SMTP, GA service account และ deployment แยกตาม runtime ที่ต้องใช้จริง ไม่ใส่ค่าใน setup script, source code หรือเอกสาร public ค่า API credentials ที่ proxy แนบ headers ไม่ได้สร้าง environment variable ให้ Supabase SDK โดยอัตโนมัติ

## Network สำหรับ setup และ integration

เริ่ม `Trusted` สำหรับ code/dependency work ถ้าถึงขั้นติดต่อ Supabase ผ่าน SDK/HTTP จาก VM ให้เปลี่ยนเป็น `Custom`, เปิด **Also include default list of common package managers**, แล้วเพิ่ม `wdcbbjvxrcxuaabcipqo.supabase.co`; เพิ่ม `api.supabase.com` เมื่อจำเป็นต้องเรียก Management API จาก VM ข้อเสนอนี้ยังไม่ใช่การอนุมัติให้ cloud agent สร้างหรือแก้ production resource

Trusted ครอบคลุม npm และ Node download domains แต่ไม่ได้ระบุ Supabase ในรายการ default; connector MCP ที่เปิดใช้เดินทางคนละช่องกับ VM network ดู [network access/default allowlist](https://code.claude.com/docs/en/cloud-environments#network-access) จึงต้องตรวจทั้งสิทธิของ connector และ HTTP reachability ตามวิธี integration ที่ใช้จริง ไม่เปิด Full เพียงเพื่อให้ npm ติดตั้งได้

## Setup script และ checkout ที่ต้องตรวจ

ค่าปกติในช่อง Setup script คือ:

```bash
bash scripts/cloud/setup.sh
```

ก่อนเริ่ม session ต้องให้ branch ที่ cloud clone มีไฟล์นี้พร้อม `package.json`, `package-lock.json` และเอกสาร handoff ครบ ถ้า script หาไม่พบ ให้ตรวจ `pwd`, repository ที่เลือก และ branch ก่อน ไม่คัดลอก path Windows ไปใช้ใน Linux และไม่เดา path `/root/...` ของ checkout

หน้าที่ของ script ที่งานหลักเตรียม:

1. หา/ตรวจ root ของ checkout ที่ถูกต้องและตรวจ manifest/lockfile
2. ใช้ Node 24.18.0 ตาม `.nvmrc` ดาวน์โหลดจาก nodejs.org ตรวจ SHA256 จาก official `SHASUMS256.txt`; ถ้า Ubuntu image ไม่มี `curl`/`xz` จะติดตั้งผ่าน `apt-get` ก่อน แล้วแสดง `node --version`/`npm --version`
3. รัน `npm ci` ที่ root เพื่อติดตั้งตาม lockfile รวม dev dependencies; ถ้าขั้นนี้ล้มเหลวต้องรายงาน failure ไม่กลบด้วย `|| true`
4. ไม่เริ่ม dev server ค้างใน setup ไม่สร้าง Supabase project ไม่รัน migration ไม่ deploy และไม่พิมพ์ secrets

`npm ci` ต้องมี lockfile ที่ตรงกับ manifest และไม่ปรับ manifest/lockfileระหว่างติดตั้งตาม [npm documentation](https://docs.npmjs.com/cli/v11/commands/npm-ci/) หาก lock ไม่ตรง ให้แก้ใน branch งานอย่างตั้งใจและตรวจ diff แทนการแทน `ci` ด้วย `install` เงียบ ๆ

Claude Cloud ใช้ Ubuntu 24.04 x86_64 และรายการ base tools ยังระบุ Node 20/21/22; setup ต้อง provision Node 24 ชัดเจน Setup ที่สำเร็จในเวลาประมาณห้านาทีถูก cache เป็น filesystem ส่วน process ที่รันค้างไม่ถูกเก็บ SessionStart เหมาะกับงานที่ต้องรันทุก startup/resume ดู [installed tools/setup scripts](https://code.claude.com/docs/en/cloud-environments#setup-scripts)

`nvm` เป็น shell function ที่ต้อง source และ Bash non-interactive ไม่โหลด profile ปกติ ตาม [nvm documentation](https://github.com/nvm-sh/nvm#installing-in-docker) จึงติดตั้ง Node แบบระบุตำแหน่งคงที่ใน `/opt/telemart-cloud` และให้ `.claude/settings.json` เรียก `scripts/cloud/session-start.sh` เพื่อเขียน PATH ลง `CLAUDE_ENV_FILE` ในทุก startup/resume แทนการหวังว่า `export PATH` จาก setup shell จะคงอยู่ ตรวจ `node --version` และ `command -v node` ใน **shell ใหม่ของ cloud session** อีกครั้ง

## สิ่งที่ส่งไปกับ repository

- ส่งไฟล์แผน, design brief, script, manifest/lock และ handoff ผ่าน branch ที่ cloud จะ clone ตรวจ `git status` และ branch ก่อนส่ง
- พวก skills/plugin/config ที่อยู่เฉพาะบน Windows ไม่ได้พิสูจน์ว่ามีใน cloud ใช้ไฟล์ที่ repository มีจริงและ connector ที่ session เปิดจริง
- Skills ที่เตรียมใน `.agents/skills/` เป็น canonical files ของงานนี้ ให้ handoff/`CLAUDE.md` ระบุไฟล์ที่ต้องอ่าน ส่วนการ auto-load slash commands ของ Claude Cloud ใช้ project `.claude/skills/` ที่ commit แล้ว หรือ skills ของบัญชี claude.ai ตาม [Claude skills documentation](https://code.claude.com/docs/en/skills#use-skills-in-cowork-and-cloud-sessions) ไม่อ้างว่า plugin ของ Codex ถูกเชื่อมให้ Claude แล้ว

เมื่อ cloud ใช้การ clone จาก GitHub จะเริ่มจาก remote branch ไม่ใช่ไฟล์ค้างในเครื่อง ดู [cloud handoff ทางการ](https://code.claude.com/docs/en/claude-code-on-the-web#from-terminal-to-cloud) จึงต้องให้ task files ที่จำเป็นไปถึง branch นั้นก่อนเริ่ม session; บันทึกเอกสารในเครื่องอย่างเดียวไม่ใช่การตั้งค่า cloud สำเร็จ

## Readiness และ launch gates

| ระดับ | ต้องมีหลักฐาน |
| --- | --- |
| เตรียมพร้อมใน repo | script/manifest/lock/handoff อยู่ใน branch ที่เลือก; placeholders และขอบเขต implementation ชัด |
| Environment บันทึกแล้ว | เห็นชื่อ environment และเลือกใช้กับ session จริง; ค่าที่กรอกตรงเอกสาร |
| Cloud setup ผ่าน | setup exit 0, Node 24 ใน shell ใหม่, `npm ci` ผ่านและ manifest/lock ไม่เปลี่ยนโดยไม่ตั้งใจ |
| เริ่มงานพัฒนาได้ | อ่าน plan/decisions/handoff; ยืนยัน target Supabase; รัน baseline build/typecheck ที่เหมาะกับ source ปัจจุบัน |
| Integration ยืนยันแล้ว | Auth/DB/Storage/lead/analytics ทดสอบกับ target จริงและมีผลที่ตรวจได้ |
| Release พร้อม | ตาม release gates ใน PLAN.md; การเปิด cloud session ไม่เท่ากับ deploy หรือ production พร้อม |

ขณะเตรียม environment ให้ใช้คำสั่งตรวจตามโค้ดจริง: `npm run build` แล้ว `npx tsc --noEmit` สำหรับ baseline นี้ เพราะ build สร้าง Next image declarations; ตรวจ lint script หลัง Next/ESLint migrationก่อนเรียก gate ใหม่ รายงาน library/setup, implementation, integration และ deployment แยกกัน
