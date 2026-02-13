import { PlatformMaster } from "./types";

// サンプル媒体マスタ（将来はスプレッドシートから取得）
export const PLATFORM_MASTER: PlatformMaster[] = [
  { id: "google_search", name: "Google 検索広告", color: "#4285F4", icon: "G検", bg: "#E8F0FE", parent: "Google", sortOrder: 1 },
  { id: "yahoo_search", name: "Yahoo! 検索広告", color: "#FF0033", icon: "YS", bg: "#FFF0F3", parent: "Yahoo!", sortOrder: 2 },
  { id: "yahoo_display", name: "Yahoo! ディスプレイ", color: "#7B0099", icon: "YD", bg: "#F5E6FF", parent: "Yahoo!", sortOrder: 3 },
  { id: "google_pmax", name: "Google P-MAX", color: "#34A853", icon: "PM", bg: "#E6F4EA", parent: "Google", sortOrder: 4 },
  { id: "meta", name: "Meta 広告", color: "#0081FB", icon: "M", bg: "#E7F3FF", parent: "Meta", sortOrder: 5 },
];

const PLATFORMS_MAP = new Map(PLATFORM_MASTER.map((p) => [p.id, p]));

const FALLBACK_PLATFORM: Omit<PlatformMaster, "id" | "parent"> = {
  name: "不明",
  color: "#6B7280",
  icon: "??",
  bg: "#F3F4F6",
  sortOrder: 99,
};

export function getPlatform(id: string): PlatformMaster {
  const found = PLATFORMS_MAP.get(id);
  if (found) return found;
  return {
    id,
    name: id,
    color: FALLBACK_PLATFORM.color,
    icon: id.substring(0, 2).toUpperCase(),
    bg: FALLBACK_PLATFORM.bg,
    parent: id,
    sortOrder: FALLBACK_PLATFORM.sortOrder,
  };
}
