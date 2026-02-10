import { NextResponse } from "next/server";
import { sampleDashboardData } from "@/lib/sample-data";

// 現在はサンプルデータを返す。将来Google Sheets連携時にキャッシュデータに差し替え。
export async function GET() {
  return NextResponse.json(sampleDashboardData);
}
