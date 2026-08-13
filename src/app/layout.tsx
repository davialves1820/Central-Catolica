import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, EB_Garamond, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { PWARegister } from "@/components/shared/PWARegister";
import Header from "@/components/shared/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Meu Canto Católico",
    template: "%s | Meu Canto Católico",
  },
  description:
    "Bíblia Sagrada, Liturgia Diária, Calendário Litúrgico e muito mais.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Meu Canto Católico",
  },
  icons: {
    icon: [
      { url: "/images/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/images/icon-180.png",
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
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} ${montserrat.variable} antialiased bg-[#fbf9f4] text-[#1b1c19] min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <PWARegister />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}