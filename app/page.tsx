import Dashboard from "./components/Dashboard";
import { fetchDashboardData } from "@/lib/fetch-data";

// 1時間ごとにISRで再生成
export const revalidate = 3600;

export default async function Home() {
  const data = await fetchDashboardData();
  return <Dashboard data={data} />;
}
