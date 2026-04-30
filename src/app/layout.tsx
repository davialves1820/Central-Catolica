import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { PWARegister } from "@/components/shared/PWARegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Paróquia Menino Jesus de Praga",
    template: "%s | Menino Jesus de Praga",
  },
  description:
    "Bíblia Sagrada, Liturgia Diária, Calendário Litúrgico e Pastorais da Paróquia Santo Menino Jesus de Praga — João Pessoa, PB.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MJP Paróquia",
  },
  icons: {
    icon: "/images/menino-jesus-logo.png",
    apple: "/images/menino-jesus-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#c9a84c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <PWARegister />
      </body>
    </html>
  );
}