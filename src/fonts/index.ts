import localFont from "next/font/local";

// The site's two typefaces, served from this repository. next/font/google made
// builds fail now and then: Next 16.3.7 (Turbopack) rejects Google's stylesheet
// URL ("next/font/google queries have exactly one entry"). Every root layout
// imports these objects, so each font is defined and hosted once. Where the
// files come from, and how the Anuphan file was cut: README.md beside this file.

/**
 * Body text. IBM's own files, unmodified: the Reserved Font Name "Plex" rules
 * out subsets. No Bold: nothing sets 700 in this face (bold headlines are
 * Anuphan), and a stray 700 falls back to SemiBold.
 */
export const plexThai = localFont({
  src: [
    { path: "./ibm-plex-sans-thai/IBMPlexSansThai-Regular.woff2", weight: "400", style: "normal" },
    { path: "./ibm-plex-sans-thai/IBMPlexSansThai-Medium.woff2", weight: "500", style: "normal" },
    { path: "./ibm-plex-sans-thai/IBMPlexSansThai-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-plex-thai",
});

/** Display face for headlines, prices and speeds: one variable file for weights 500–700. */
export const anuphan = localFont({
  src: "./anuphan/Anuphan-Thai-Latin-wght500-700.woff2",
  weight: "500 700",
  style: "normal",
  display: "swap",
  variable: "--font-anuphan",
});

/** Class names that set --font-plex-thai and --font-anuphan on an element. */
export const fontVariables = `${plexThai.variable} ${anuphan.variable}`;
