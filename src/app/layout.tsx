// app/layout.tsx (TypeScript) หรือ app/layout.jsx (JavaScript)
import './globals.css'
import { Prompt } from 'next/font/google'
import type { Metadata } from 'next'
  
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 1) เรียกใช้ฟอนต์ Prompt จาก next/font/google
const prompt = Prompt({
  subsets: ['thai'], // เลือก subset เป็น thai เพื่อให้แสดงผลภาษาไทยได้
  weight: ['300', '400', '500', '600', '700'], // ต้องการ weight ใดบ้าง
  display: 'swap', // ใช้ค่า 'swap' เพื่อปรับการแสดงผลให้เร็วขึ้น
})

export const metadata: Metadata = {
  title: 'TelemartUbon',
  description: 'Testing Prompt Thai font',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // 2) เพิ่ม className จากตัวแปร prompt.className ตรงแท็ก html หรือ body
    <html lang="th" className={prompt.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/src/app/logo.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
