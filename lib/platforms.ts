import { PlatformMaster } from "./types";

// サンプル媒体マスタ（将来はスプレッドシートから取得）
export const PLATFORM_MASTER: PlatformMaster[] = [
  { id: "google_search", name: "Google 検索広告", color: "#16A34A", icon: "G検", bg: "#DCFCE7", parent: "Google", sortOrder: 1 },
  { id: "yahoo_search", name: "Yahoo! 検索広告", color: "#DC2626", icon: "YS", bg: "#FEE2E2", parent: "Yahoo!", sortOrder: 2 },
  { id: "yahoo_display", name: "Yahoo! ディスプレイ", color: "#7B0099", icon: "YD", bg: "#F5E6FF", parent: "Yahoo!", sortOrder: 3 },
  { id: "google_pmax", name: "Google P-MAX", color: "#166534", icon: "PM", bg: "#D1FAE5", parent: "Google", sortOrder: 4 },
  { id: "meta", name: "Meta 広告", color: "#1E3A8A", icon: "M", bg: "#DBEAFE", parent: "Meta", sortOrder: 5 },
];

const PLATFORMS_MAP = new Map(PLATFORM_MASTER.map((p) => [p.id, p]));

const FALLBACK_PLATFORM: Omit<PlatformMaster, "id" | "parent"> = {
  name: "不明",
  color: "#6B7280",
  icon: "??",
  bg: "#F3F4F6",
  sortOrder: 99,
};

let dynamicMap: Map<string, PlatformMaster> | null = null;

export function setDynamicPlatforms(platforms: PlatformMaster[]) {
  dynamicMap = new Map(platforms.map((p) => [p.id, p]));
}

export function getPlatform(id: string): PlatformMaster {
  const found = dynamicMap?.get(id) ?? PLATFORMS_MAP.get(id);
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
