import { MetadataRoute } from "next";

import { env } from "@/env.mjs";

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${env.SITE_URL}/sitemap.xml`,
  };
}
