import jwt from "jsonwebtoken";

import { env } from "@/env.mjs";

const JWT_SECRET = env.JWT_TOKEN_SECRET;

export function signJWT(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

export function verifJWT(token: string) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);

    return payload;
  } catch (error) {
    return null;
  }
}
