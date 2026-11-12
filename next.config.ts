import type { NextConfig } from "next";

// Public pages live in src/app/[locale]. Thai keeps the site's existing,
// unprefixed URLs, so those requests are rewritten to the "th" segment;
// English is served from /en as is. The rewrite runs after static files and
// non-dynamic routes (the back office, /auth, /api, metadata files) have had
// their chance, so it only reaches public pages; unknown paths end at global-not-found.
// Pictures uploaded from the editor live in the project's Storage bucket `media` (R4).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL) : null;
const localSupabase = supabaseUrl !== null && ["127.0.0.1", "localhost"].includes(supabaseUrl.hostname);

const NEW_SITE = "https://www.truegetherth.com";

const nextConfig: NextConfig = {
  experimental: {
    // Public pages sit under a dynamic root segment (src/app/[locale]) and the
    // back office has its own root layout, so unmatched URLs need the
    // routing-level 404 in src/app/global-not-found.tsx.
    globalNotFound: true,
    // Picture uploads (8 MB at most, see media-actions.ts) plus the form's own bytes.
    serverActions: { bodySizeLimit: "9mb" },
  },
  images: {
    remotePatterns: supabaseUrl
      ? [
          {
            protocol: supabaseUrl.protocol === "http:" ? "http" : "https",
            hostname: supabaseUrl.hostname,
            port: supabaseUrl.port,
            pathname: "/storage/v1/object/public/media/**",
          },
        ]
      : [],
    // Only the local test stack serves Storage from 127.0.0.1; never true for a hosted project.
    dangerouslyAllowLocalIP: localSupabase,
  },
  async headers() {
    return [
      // Frames of the home film (docs/renovation/R1-HOME-FILM.md). A new cut
      // goes in a new folder (home-v1, home-v2…), so visitors keep frames a week.
      { source: "/media/film/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] },
    ];
  },
  async redirects() {
    // This domain has moved to www.truegetherth.com (owner's decision, 2026-11-12).
    // The two sites share their URLs, so every page goes to the same path there.
    return [
      { source: "/th", destination: NEW_SITE, permanent: true },
      { source: "/th/:path*", destination: `${NEW_SITE}/:path*`, permanent: true },
      { source: "/SoonContent", destination: NEW_SITE, permanent: true },
      { source: "/en/SoonContent", destination: `${NEW_SITE}/en`, permanent: true },
      // Everything else keeps its path. Google's ownership file stays here so
      // Search Console can still verify this domain for the change of address.
      { source: "/", destination: NEW_SITE, permanent: true },
      { source: "/:path((?!google[0-9a-z]+\.html$).+)", destination: `${NEW_SITE}/:path`, permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/", destination: "/th" },
        {
          source: "/:path((?!en(?:/|$)|admin(?:/|$)|auth(?:/|$)|api(?:/|$)|_next(?:/|$)).+)",
          destination: "/th/:path",
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
