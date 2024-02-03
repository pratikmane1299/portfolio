import * as z from "zod";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { signJWT } from "@/lib/jwt";

const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export async function POST(request: Request) {
  const body: z.infer<typeof loginSchema> = await request.json();

  const parsed = await loginSchema.safeParseAsync(body);
  if (!parsed.success) {
    const validationErr: Record<string, string> = {};

    parsed.error.errors.forEach((err) => {
      validationErr[err.path[0]] = err.message;
    });

    // return error here...
    return NextResponse.json(
      { success: false, error: validationErr },
      { status: 400 }
    );
  }

  // find user
  const user = await prisma.user.findFirst({
    where: {
      username: body.username,
    },
  });

  if (user === null) {
    return NextResponse.json(
      { success: false, message: "Incorrect username or password" },
      { status: 400 }
    );
  }

  // compare passwords
  const match = await bcrypt.compare(body.password, user?.password as string);
  if (!match) {
    // return error - passwords don't match...
    return NextResponse.json(
      { success: false, message: "Incorrect username or password" },
      { status: 400 }
    );
  }

  // generate token
  const token = signJWT({ id: user?.id, username: user?.username });

  // return token here...
  return NextResponse.json({ success: true, data: { token } });
}
