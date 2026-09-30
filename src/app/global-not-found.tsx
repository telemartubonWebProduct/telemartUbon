import type { Metadata } from "next";

import "@/styles/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "ไม่พบหน้านี้ · Page not found",
};

export default function GlobalNotFound() {
  return (
    <html lang="th">
      <body>
        <main>
          <h1>ไม่พบหน้านี้</h1>
          <div lang="en">
            <h2>Page not found</h2>
          </div>
        </main>
      </body>
    </html>
  );
}
