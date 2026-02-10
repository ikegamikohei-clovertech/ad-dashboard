"use client";

import { getPlatform } from "@/lib/platforms";

interface Props {
  platformId: string;
  size?: number;
}

export default function PlatformIcon({ platformId, size = 28 }: Props) {
  const p = getPlatform(platformId);
  return (
    <span
      className="inline-flex items-center justify-center rounded-md font-extrabold text-white shrink-0"
      style={{
        width: size,
        height: size,
        background: p.color,
        fontSize: size * 0.36,
        letterSpacing: -0.5,
        lineHeight: 1,
      }}
    >
      {p.icon}
    </span>
  );
}
