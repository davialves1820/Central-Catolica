import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { brandOgImageElement } from "@/lib/shared/brandOgImage";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(brandOgImageElement(), { ...size });
}
