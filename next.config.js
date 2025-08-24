const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Include MDX in Next’s page extensions
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

  // Keep the URL /resources/changelog/rss.xml but serve /api/rss content
  async rewrites() {
    return [
      { source: "/resources/changelog/rss.xml", destination: "/api/rss" },
    ];
  },

  // If you also want other rewrites/redirects, add them here
  // async redirects() {
  //   return [
  //     // Example: { source: "/docs", destination: "/resources/docs", permanent: true },
  //   ];
  // },
};

module.exports = withMDX(nextConfig);
