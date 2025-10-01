/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed MDX configuration since @next/mdx is not in dependencies
  
  // Keep the URL /resources/changelog/rss.xml but serve /api/rss content
  async rewrites() {
    return [
      { source: "/resources/changelog/rss.xml", destination: "/api/rss" },
    ];
  },

  // Add useful redirects
  async redirects() {
    return [
      // Redirect /docs to /resources/docs for backward compatibility
      { source: "/docs", destination: "/resources/docs", permanent: true },
    ];
  },
};

module.exports = nextConfig;
