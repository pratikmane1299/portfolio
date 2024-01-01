import { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog";
import { env } from "@/env.mjs";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getAllPosts();

  const sitemap = [
    {
      url: `${env.SITE_URL}/`,
      lastModified: new Date().toString(),
    },
    {
      url: `${env.SITE_URL}/blog`,
      lastModified: new Date().toString(),
    },
    ...allPosts.map((post) => ({
      url: `${env.SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt).toString(),
    })),
  ];

  return sitemap;
}
