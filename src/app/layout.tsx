import type { Metadata } from "next";
import "@/styles/tokens.css";
import "./globals.css";

// Shared by the public site and the back office. Fonts, tracking tags and UI
// providers live in the (public) and admin layouts so neither area loads the
// other's scripts.
export const metadata: Metadata = {
  title: "TelemartUbon",
  description: "Testing Prompt Thai font",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
