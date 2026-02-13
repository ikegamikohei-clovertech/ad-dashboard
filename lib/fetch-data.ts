import { fetchPlatformMaster, fetchAdRows } from "./sheets";
import { transformToCampaigns } from "./transform";
import { sampleDashboardData } from "./sample-data";
import type { DashboardData } from "./types";

/**
 * Google Sheets からデータを取得。環境変数が未設定の場合はサンプルデータを返す。
 */
export async function fetchDashboardData(): Promise<DashboardData> {
  // 環境変数が未設定ならサンプルデータにフォールバック
  if (
    !process.env.GOOGLE_SHEETS_SPREADSHEET_ID ||
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  ) {
    return { ...sampleDashboardData, fetchedAt: new Date().toISOString() };
  }

  try {
    const [platforms, rows] = await Promise.all([
      fetchPlatformMaster(),
      fetchAdRows(),
    ]);
    const campaigns = transformToCampaigns(rows);
    return { platforms, campaigns, fetchedAt: new Date().toISOString() };
  } catch (error) {
    console.error("Google Sheets fetch failed, using sample data:", error);
    return { ...sampleDashboardData, fetchedAt: new Date().toISOString() };
  }
}
