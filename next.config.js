const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Include MDX in Next’s page extensions
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

  // Redirect /resources/changelog/rss.xml → /api/rss
  async redirects() {
    return [
      { source: "/resources/changelog/rss.xml", destination: "/api/rss", permanent: false },
    ];
  },
};

module.exports = withMDX(nextConfig);
