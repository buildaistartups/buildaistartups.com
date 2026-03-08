const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

  // Turbopack top-level config (moved out of experimental.turbo)
  turbopack: {},
};

module.exports = withMDX(nextConfig);
