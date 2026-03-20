import * as React from "react";

interface PasswordResetEmailProps {
  resetLink: string;
}

export const PasswordResetEmail: React.FC<
  Readonly<PasswordResetEmailProps>
> = ({ resetLink }) => (
  <div
    style={{
      fontFamily: "sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      border: "1px solid #eee",
      borderRadius: "12px",
    }}
  >
    <h2 style={{ color: "#8B0000", marginBottom: "20px" }}>
      Redefinição de Senha
    </h2>
    <p style={{ color: "#333", lineHeight: "1.6" }}>
      Recebemos uma solicitação para redefinir a senha da sua conta. Se foi
      você, clique no botão abaixo para escolher uma nova senha:
    </p>
    <div style={{ textAlign: "center", margin: "30px 0" }}>
      <a
        href={resetLink}
        style={{
          backgroundColor: "#8B0000",
          color: "white",
          padding: "12px 24px",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          display: "inline-block",
        }}
      >
        Redefinir Senha
      </a>
    </div>
    <p style={{ color: "#666", fontSize: "14px" }}>
      Se você não solicitou a redefinição da senha, ignore este e-mail. Nenhuma
      alteração foi feita em sua conta.
    </p>
    <p style={{ color: "#666", fontSize: "14px", marginTop: "10px" }}>
      O link acima expira em 1 hora.
    </p>
    <hr
      style={{ border: "none", borderTop: "1px solid #eee", margin: "30px 0" }}
    />
    <p style={{ fontSize: "12px", color: "#999" }}>
      Paróquia Manager - Sistema de Gestão Paroquial
    </p>
  </div>
);
