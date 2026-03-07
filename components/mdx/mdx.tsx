import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import PostLink from "./link";
import PostImage from "./image";
import rehypeHighlight from "rehype-highlight";

// Helper to create slugs for headings
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
  return (
    <MDXRemote
      {...props}
      components={{ ...mdxComponents, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          // rehype-highlight is pure JS and works in Edge/Serverless perfectly
          rehypePlugins: [rehypeHighlight],
        },
      }}
    />
  );
}
