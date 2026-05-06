import { type ColorDotProps, DOT } from "@/types/calendar";

/** A small colored circle indicating the liturgical color of a day. */
export default function ColorDot({ color, className = "" }: ColorDotProps) {
  return (
    <span
      className={`block w-1.5 h-1.5 rounded-full shrink-0 ${DOT[color] || "bg-slate-400"} ${className}`}
      aria-hidden="true"
    />
  );
}
