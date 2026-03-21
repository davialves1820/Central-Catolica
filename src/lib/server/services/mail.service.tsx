import { Resend } from "resend";
import { VerificationEmail } from "@/components/emails/VerificationEmail";
import { PasswordResetEmail } from "@/components/emails/PasswordResetEmail";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const domain = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/verify-email?token=${token}`;

  if (!resend) {
    console.error("RESEND_API_KEY is missing. Verification email not sent.");
    return;
  }

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Paróquia Manager <onboarding@resend.dev>",
    to: email,
    subject: "Confirme seu e-mail",
    react: <VerificationEmail confirmLink={confirmLink} />,
  });

  if (error) {
    console.error("Resend error (verification):", error);
    return;
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/reset-password?token=${token}`;

  if (!resend) {
    console.error("RESEND_API_KEY is missing. Password reset email not sent.");
    return;
  }

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Paróquia Manager <onboarding@resend.dev>",
    to: email,
    subject: "Redefinição de Senha",
    react: <PasswordResetEmail resetLink={resetLink} />,
  });

  if (error) {
    console.error("Resend error (password reset):", error);
    return;
  }
};
