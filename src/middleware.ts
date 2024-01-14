// See "Matching Paths" below to learn more
import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "https://pratikmane.netlify.app",
  "http://localhost:3000",
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function middleware(request: NextRequest) {
  if (
    request.method === "OPTIONS" &&
    allowedOrigins.includes(request.headers.get("origin")!)
  ) {
    return NextResponse.json({}, { headers: corsHeaders });
  }
  const response = NextResponse.next();
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.append(key, value);
  });

  return response;
}

export const config = {
  matcher: "/api/blog/analytics/:path*",
};