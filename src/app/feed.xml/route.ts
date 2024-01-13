import RSS from "rss";

import { getAllPosts } from "@/lib/blog";
import { env } from "@/env.mjs";
import { name } from "@/data";

export async function GET() {
  try {
    const feed = new RSS({
      title: name,
      description: `${name}'s Blog`,
      feed_url: `${env.SITE_URL}/feed.xml`,
      site_url: env.SITE_URL,
      managingEditor: name,
      webMaster: name,
      copyright: `Copyright ${new Date().getFullYear().toString()}, ${name}`,
      pubDate: new Date().toUTCString(),
      ttl: 1440,
    });

    const posts = await getAllPosts();

    if (posts.length > 0) {
      posts.forEach((post) => {
        feed.item({
          title: post.title,
          description: post.description || "",
          url: `${env.SITE_URL}/blog/${post.slug}`,
          author: name,
          date: post.createdAt,
        });
      });
    }

    return new Response(feed.xml({ indent: true }), {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  } catch (error) {
    console.log("error - ", error);
  }
}
