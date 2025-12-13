import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import PostLink from "./link";
import PostImage from "./image";
import rehypePrettyCode from "rehype-pretty-code";

const transformToSlug = (input: string) => {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .join("-")
    .split("&")
    .join("-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

const generateHeading = (headingLevel: number) => {
  return ({ children }: { children: React.ReactNode }) => {
    const textContent = React.Children.toArray(children).join("");
    const slug = transformToSlug(textContent);
    return React.createElement(`h${headingLevel}`, { id: slug }, [
      React.createElement("a", {
        href: `#${slug}`,
        key: `link-${slug}`,
        className: "anchor-link",
      }),
      textContent,
    ]);
  };
};

const mdxComponents = {
  h1: generateHeading(1),
  h2: generateHeading(2),
  h3: generateHeading(3),
  h4: generateHeading(4),
  Link: PostLink,
  Image: PostImage,
};

export function CustomMDX(props: any) {
  const rehypePrettyCodeOptions = {
    // We keep the safe theme
    theme: "github-dark",
    keepBackground: false,
    
    // ❌ REMOVED: onVisitLine, onVisitHighlightedLine, etc.
    // These functions cannot be serialized by MDXRemote, causing the build crash.
    // The plugin will still add data-highlighted-line attributes you can target with CSS.
  };

  return (
    <MDXRemote
      {...props}
      components={{ ...mdxComponents, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
        },
      }}
    />
  );
}
