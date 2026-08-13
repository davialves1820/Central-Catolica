import { ReactNode } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/shared/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "Você está offline",
  description: "Página de fallback exibida quando não há conexão com a internet.",
  path: "/offline",
  noIndex: true,
});

export default function OfflineLayout({ children }: { children: ReactNode }) {
  return children;
}
