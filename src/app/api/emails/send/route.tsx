import React from "react";
import { NextRequest } from "next/server";
import { Resend } from "resend";
import { VerificationEmail } from "@/components/emails/VerificationEmail";
import { auth } from "@/lib/server/auth";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { error: "Email service not configured" },
      { status: 500 },
    );
  }

  let body: { to: string; subject: string; type: string; data: { link?: string; message?: string } };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { to, subject, type, data } = body;

  if (!to || !subject) {
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const reactElement =
    type === "verification" ? (
      <VerificationEmail confirmLink={data.link || ""} />
    ) : (
      <div>{data.message || "Nova mensagem da Paróquia"}</div>
    );

  try {
    if (!resend) {
      return Response.json({ error: "Email provider not initialized" }, { status: 500 });
    }
    const { data: resendData, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Paróquia Manager <onboarding@resend.dev>",
      to: [to],
      subject,
      react: reactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(resendData);
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
