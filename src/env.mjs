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
	},
});
