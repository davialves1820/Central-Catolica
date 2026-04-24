"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/server/db";
import { ResetSchema, NewPasswordSchema } from "@/lib/shared/schemas/auth";
import {
  generatePasswordResetToken,
} from "@/lib/server/services/token.service";
import {
  sendPasswordResetEmail,
} from "@/lib/server/services/mail.service";

export const resetPasswordRequest = async (
  values: z.infer<typeof ResetSchema>,
) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Email inválido!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return { error: "Email não encontrado!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  if (passwordResetToken) {
    await sendPasswordResetEmail(email, passwordResetToken.token);
  }

  return { success: "Email de redefinição enviado!" };
};

export const resetPasswordConfirm = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Token ausente!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Senha inválida!" };
  }

  const { password } = validatedFields.data;

  const existingToken = await prisma.verification_tokens.findUnique({
    where: { token, type: "PASSWORD_RESET" },
  });

  if (!existingToken) {
    return { error: "Token inválido!" };
  }

  const hasExpired = new Date(existingToken.expires_at) < new Date();

  if (hasExpired) {
    return { error: "Token expirado!" };
  }

  if (existingToken.used_at) {
    return { error: "Token já utilizado!" };
  }

  const existingUser = await prisma.users.findUnique({
    where: { id: existingToken.user_id },
  });

  if (!existingUser) {
    return { error: "Usuário não encontrado!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.users.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await prisma.verification_tokens.update({
    where: { id: existingToken.id },
    data: { used_at: new Date() },
  });

  return { success: "Senha redefinida com sucesso!" };
};

export const verifyEmail = async (token: string) => {
  const existingToken = await prisma.verification_tokens.findUnique({
    where: { token, type: "EMAIL_VERIFICATION" },
  });

  if (!existingToken) {
    return { error: "Token não existe!" };
  }

  const hasExpired = new Date(existingToken.expires_at) < new Date();

  if (hasExpired) {
    return { error: "Token expirado!" };
  }

  const existingUser = await prisma.users.findUnique({
    where: { id: existingToken.user_id },
  });

  if (!existingUser) {
    return { error: "Usuário não cadastrado!" };
  }

  await prisma.users.update({
    where: { id: existingUser.id },
    data: {
      email_verified: new Date(),
    },
  });

  await prisma.verification_tokens.update({
    where: { id: existingToken.id },
    data: { used_at: new Date() },
  });

  return { success: "Email verificado!" };
};
