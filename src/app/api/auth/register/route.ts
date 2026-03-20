import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/server/db/index";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/lib/shared/schemas/auth";
import { generateVerificationToken } from "@/lib/server/services/token.service";
import { sendVerificationEmail } from "@/lib/server/services/mail.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedFields = RegisterSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error: "Dados inválidos",
          details: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { email, password, fullName } = validatedFields.data;

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        full_name: fullName || email,
        role: "FIEL",
        created_at: new Date(),
      },
    });

    // Generate and send verification email
    const verificationToken = await generateVerificationToken(email);
    if (verificationToken) {
      await sendVerificationEmail(email, verificationToken.token);
    }

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
