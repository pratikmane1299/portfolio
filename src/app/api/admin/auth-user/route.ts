import { NextResponse } from "next/server";

import withAuth from "@/middlewares/auth";

export const GET = withAuth(
  async (request: Request, response: NextResponse) => {
    return NextResponse.json({
      success: true,
      // @ts-ignore
      data: request?.user,
    });
  }
);
