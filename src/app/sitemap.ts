export const dynamic = 'force-static';

import { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog";
import { env } from "@/env.mjs";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPosts = await getAllPosts();

  const sitemap = [
    {
      url: `${env.SITE_URL}/`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${env.SITE_URL}/blog`,
      lastModified: new Date().toISOString(),
    },
    ...allPosts.map((post) => ({
      url: `${env.SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt).toISOString(),
    })),
  ];

  return sitemap;
}
