import type { NextConfig } from "next";

// Public pages live in src/app/[locale]. Thai keeps the site's existing,
// unprefixed URLs, so those requests are rewritten to the "th" segment;
// English is served from /en as is. The rewrite runs after static files and
// non-dynamic routes (the back office, /auth, /api, metadata files) have had
// their chance, so it only reaches public pages; unknown paths end at global-not-found.
const nextConfig: NextConfig = {
  experimental: {
    // Public pages sit under a dynamic root segment (src/app/[locale]) and the
    // back office has its own root layout, so unmatched URLs need the
    // routing-level 404 in src/app/global-not-found.tsx.
    globalNotFound: true,
  },
  async headers() {
    return [
      // Frames of the home film (docs/renovation/R1-HOME-FILM.md). A new cut
      // goes in a new folder (home-v1, home-v2…), so visitors keep frames a week.
      { source: "/media/film/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] },
    ];
  },
  async redirects() {
    return [
      // /th/... would duplicate the unprefixed Thai URLs.
      { source: "/th", destination: "/", permanent: true },
      { source: "/th/:path*", destination: "/:path*", permanent: true },
      // Unfinished "not ready" placeholder from the old site; nothing links to it.
      { source: "/SoonContent", destination: "/", permanent: true },
      { source: "/en/SoonContent", destination: "/en", permanent: true },
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
