import Dashboard from "./components/Dashboard";
import { sampleDashboardData } from "@/lib/sample-data";

export default function Home() {
  return <Dashboard data={sampleDashboardData} />;
}
