import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().min(),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    SITE_URL: z.string().url(),
    GITHUB_TOKEN: z.string(),
    ANALYTICS_WEBSITE_ID: z.string(),
    REVALIDATE_SECRET_TOKEN: z.string(),
    GITHUB_WEBHOOK_SECRET: z.string(),
    GITHUB_API_BASE_URL: z.string().url(),
    SOME_SECRET_TOKEN: z.string(),
    GOOGLE_VERIFICATION_ID: z.string(),
    JWT_TOKEN_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_SOME_SECRET_TOKEN: z.string(),
    NEXT_PUBLIC_ADMIN_USERNAME: z.string(),
    NEXT_PUBLIC_ADMIN_PASSWORD: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SOME_SECRET_TOKEN: process.env.NEXT_PUBLIC_SOME_SECRET_TOKEN,
    NEXT_PUBLIC_ADMIN_USERNAME: process.env.NEXT_PUBLIC_ADMIN_USERNAME,
    NEXT_PUBLIC_ADMIN_PASSWORD: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
  },
});
