"use client";

import { useState, useMemo } from "react";
import { DashboardData, Campaign, DisplayAd, SelectedNode } from "@/lib/types";
import { PLATFORM_MASTER } from "@/lib/platforms";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import Breadcrumb from "./Breadcrumb";
import AdCard from "./AdCard";
import AdTable from "./AdTable";

interface Props {
  data: DashboardData;
}

function getAdText(ad: { headlines: string[]; descriptions: string[] }) {
  return [...ad.headlines, ...ad.descriptions].join(" ");
}

export default function Dashboard({ data }: Props) {
  const { platforms, campaigns } = data;

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  // Derive available platforms from data, sorted by master order
  const availablePlatforms = useMemo(() => {
    const ids = [...new Set(campaigns.map((c) => c.platform))];
    const order = (platforms.length > 0 ? platforms : PLATFORM_MASTER).map((p) => p.id);
    return ids.sort((a, b) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  }, [campaigns, platforms]);

  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(
    new Set(availablePlatforms)
  );
  const allBrands = useMemo(
    () => [...new Set(campaigns.map((c) => c.brand))].sort(),
    [campaigns]
  );
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [expandedCampaigns, setExpandedCampaigns] = useState<Set<string>>(new Set());
  const [expandedAdGroups, setExpandedAdGroups] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);

  const togglePlatform = (p: string) => {
    const n = new Set(selectedPlatforms);
    if (n.has(p)) {
      if (n.size > 1) n.delete(p);
    } else {
      n.add(p);
    }
    setSelectedPlatforms(n);
  };

  const toggleSet = (set: Set<string>, setter: (s: Set<string>) => void, id: string) => {
    const n = new Set(set);
    if (n.has(id)) n.delete(id);
    else n.add(id);
    setter(n);
  };

  const filteredData: Campaign[] = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return campaigns
      .filter(
        (c) =>
          selectedPlatforms.has(c.platform) &&
          (selectedBrand === "all" || c.brand === selectedBrand)
      )
      .map((campaign) => ({
        ...campaign,
        adGroups: campaign.adGroups
          .map((ag) => ({
            ...ag,
            ads: ag.ads.filter(
              (ad) =>
                !q ||
                `${getAdText(ad)} ${ad.url} ${campaign.campaign} ${campaign.brand} ${ag.name}`
                  .toLowerCase()
                  .includes(q)
            ),
          }))
          .filter((ag) => ag.ads.length > 0),
      }))
      .filter((c) => c.adGroups.length > 0);
  }, [campaigns, searchQuery, selectedPlatforms, selectedBrand]);

  const displayAds: DisplayAd[] = useMemo(() => {
    const ads: DisplayAd[] = [];
    filteredData.forEach((c) =>
      c.adGroups.forEach((ag) => {
        if (
          !selectedNode ||
          (selectedNode.type === "campaign" && selectedNode.id === c.id) ||
          (selectedNode.type === "adGroup" && selectedNode.id === ag.id)
        ) {
          ag.ads.forEach((ad) =>
            ads.push({
              ...ad,
              platform: c.platform,
              brand: c.brand,
              campaignName: c.campaign,
              adGroupName: ag.name,
            })
          );
        }
      })
    );
    return ads;
  }, [filteredData, selectedNode]);

  const totalAds = displayAds.length;

  return (
    <div className="bg-[#F7F8FA] min-h-screen text-[#1A1A2E] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-extrabold"
            style={{ background: "linear-gradient(135deg, #1A1A2E, #3B3B5C)" }}
          >
            Ad
          </div>
          <div>
            <h1 className="text-base font-bold m-0 tracking-tight">入稿内容ダッシュボード</h1>
            <p className="text-[11px] text-gray-400 m-0">Ad Submission Dashboard</p>
          </div>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          {([{ key: "card" as const, label: "カード" }, { key: "table" as const, label: "テーブル" }]).map((v) => (
            <button
              key={v.key}
              onClick={() => setViewMode(v.key)}
              className={`px-3 py-1 rounded-md border-none cursor-pointer text-xs font-semibold transition-all duration-200 ${
                viewMode === v.key
                  ? "bg-white text-[#1A1A2E] shadow-sm"
                  : "bg-transparent text-gray-400"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          platforms={platforms}
          availablePlatforms={availablePlatforms}
          selectedPlatforms={selectedPlatforms}
          onTogglePlatform={togglePlatform}
          brands={allBrands}
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
          filteredData={filteredData}
          expandedCampaigns={expandedCampaigns}
          onToggleCampaign={(id) => toggleSet(expandedCampaigns, setExpandedCampaigns, id)}
          expandedAdGroups={expandedAdGroups}
          onToggleAdGroup={(id) => toggleSet(expandedAdGroups, setExpandedAdGroups, id)}
          selectedNode={selectedNode}
          onSelectNode={setSelectedNode}
        />

        {/* Main content */}
        <main className="flex-1 overflow-auto flex flex-col">
          <div className="px-6 pt-4 pb-3 flex gap-4 items-center flex-wrap">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <div className="text-center">
              <div className="text-xl font-extrabold text-[#1A1A2E] leading-none">{totalAds}</div>
              <div className="text-[10px] text-gray-400 font-medium">配信中の広告</div>
            </div>
          </div>

          <Breadcrumb
            selectedNode={selectedNode}
            filteredData={filteredData}
            onSelect={setSelectedNode}
          />

          {/* Content */}
          <div className="flex-1 px-6 pb-6">
            {displayAds.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-3">🔍</div>
                <div className="text-sm font-semibold">該当する広告がありません</div>
                <div className="text-xs mt-1">フィルターや検索条件を変更してください</div>
              </div>
            ) : viewMode === "card" ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-4">
                {displayAds.map((ad) => (
                  <AdCard key={ad.id} ad={ad} />
                ))}
              </div>
            ) : (
              <AdTable ads={displayAds} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
