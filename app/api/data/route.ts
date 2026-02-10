import { NextResponse } from "next/server";
import { fetchDashboardData } from "@/lib/fetch-data";

export const revalidate = 3600;

export async function GET() {
  const data = await fetchDashboardData();
  return NextResponse.json(data);
}
