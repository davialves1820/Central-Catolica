import { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, EB_Garamond, Montserrat } from "next/font/google";
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
    default: "Central Católica",
    template: "%s | Central Católica",
  },
  description:
    "Bíblia Sagrada, Liturgia Diária, Calendário Litúrgico e muito mais.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Central Católica",
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
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} ${montserrat.variable} antialiased bg-[#fbf9f4] text-[#1b1c19] min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <PWARegister />
      </body>
    </html>
  );
}