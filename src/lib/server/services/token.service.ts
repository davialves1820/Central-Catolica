import { prisma } from "../db";
import crypto from "crypto";

export const generateVerificationToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) return null;

  // Delete existing tokens for this user and type
  await prisma.verification_tokens.deleteMany({
    where: { user_id: user.id, type: "EMAIL_VERIFICATION" },
  });

  const verificationToken = await prisma.verification_tokens.create({
    data: {
      user_id: user.id,
      token,
      expires_at: expires,
      type: "EMAIL_VERIFICATION",
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = crypto.randomUUID();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) return null;

  await prisma.verification_tokens.deleteMany({
    where: { user_id: user.id, type: "PASSWORD_RESET" },
  });

  const passwordResetToken = await prisma.verification_tokens.create({
    data: {
      user_id: user.id,
      token,
      expires_at: expires,
      type: "PASSWORD_RESET",
    },
  });

  return passwordResetToken;
};
