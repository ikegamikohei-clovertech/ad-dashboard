// 媒体マスタ1件
export interface PlatformMaster {
  id: string;
  name: string;
  color: string;
  icon: string;
  bg: string;
  parent: string;
  sortOrder: number;
}

// 広告1件
export interface Ad {
  id: string;
  headlines: string[];
  descriptions: string[];
  url: string;
  image: string | null;
}

// 広告グループ
export interface AdGroup {
  id: string;
  name: string;
  ads: Ad[];
}

// キャンペーン
export interface Campaign {
  id: string;
  platform: string;
  brand: string;
  campaign: string;
  adGroups: AdGroup[];
}

// APIレスポンス全体
export interface DashboardData {
  platforms: PlatformMaster[];
  campaigns: Campaign[];
}

// 表示用の広告（フラット化）
export interface DisplayAd extends Ad {
  platform: string;
  brand: string;
  campaignName: string;
  adGroupName: string;
}

// ツリー選択ノード
export interface SelectedNode {
  type: "campaign" | "adGroup";
  id: string;
}
