import * as React from "react";

interface VerificationEmailProps {
  confirmLink: string;
}

export const VerificationEmail: React.FC<Readonly<VerificationEmailProps>> = ({
  confirmLink,
}) => (
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
      Bem-vindo à Paróquia!
    </h2>
    <p style={{ color: "#333", lineHeight: "1.6" }}>
      Estamos felizes em ter você conosco. Para começar a usar sua conta, por
      favor confirme seu endereço de e-mail clicando no botão abaixo:
    </p>
    <div style={{ textAlign: "center", margin: "30px 0" }}>
      <a
        href={confirmLink}
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
        Confirmar E-mail
      </a>
    </div>
    <p style={{ color: "#666", fontSize: "14px" }}>
      Se o botão acima não funcionar, você também pode copiar e colar o seguinte
      link no seu navegador:
    </p>
    <p style={{ color: "#8B0000", fontSize: "12px", wordBreak: "break-all" }}>
      {confirmLink}
    </p>
    <hr
      style={{ border: "none", borderTop: "1px solid #eee", margin: "30px 0" }}
    />
    <p style={{ fontSize: "12px", color: "#999" }}>
      Este link de confirmação expira em 1 hora. Se você não solicitou este
      e-mail, pode ignorá-lo com segurança.
    </p>
  </div>
);
