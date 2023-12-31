import { Ratelimit } from "@upstash/ratelimit";

import redis from "./redis";

export const ratelimit = new Ratelimit({
	redis: redis,
	limiter: Ratelimit.fixedWindow(5, "5 s"),
});

export const identifier = "api";
