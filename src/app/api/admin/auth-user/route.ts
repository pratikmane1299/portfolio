import { NextResponse } from "next/server";

import { verifJWT } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const authorizationHeader = request.headers.get("Authorization");
  if (!authorizationHeader) {
    return NextResponse.json(
      {
        success: false,
        message: "Auth token not found",
      },
      { status: 401 }
    );
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Auth token not found",
      },
      { status: 401 }
    );
  }

  const payload: any = verifJWT(token);

  const { id } = payload || {};

  if (!id) {
    return NextResponse.json(
      { success: false, message: "Not-Authorized" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
    },
  });

  return NextResponse.json({ success: true, data: user });
}
