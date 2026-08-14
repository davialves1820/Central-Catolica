import { siteConfig } from "@/config/site";

/** Elemento JSX compartilhado pelos geradores nativos de opengraph-image e twitter-image. */
export function brandOgImageElement(subtitle = "Liturgia Diária, Bíblia, Santos e Orações") {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: siteConfig.backgroundColor,
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          border: `3px solid ${siteConfig.themeColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <div style={{ display: "flex", fontSize: 56, color: siteConfig.themeColor }}>✝</div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 64,
          fontWeight: 700,
          color: "#1b1c19",
          textAlign: "center",
          letterSpacing: -1,
        }}
      >
        {siteConfig.name}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 28,
          color: "#4d4540",
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
}
