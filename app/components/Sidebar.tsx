"use client";

import { Campaign, PlatformMaster, SelectedNode } from "@/lib/types";
import { getPlatform } from "@/lib/platforms";
import PlatformIcon from "./PlatformIcon";
import StatusBadge from "./StatusBadge";
import { ChevronIcon } from "./Icons";

interface Props {
  platforms: PlatformMaster[];
  availablePlatforms: string[];
  selectedPlatforms: Set<string>;
  onTogglePlatform: (id: string) => void;
  brands: string[];
  selectedBrand: string;
  onBrandChange: (brand: string) => void;
  filteredData: Campaign[];
  expandedCampaigns: Set<string>;
  onToggleCampaign: (id: string) => void;
  expandedAdGroups: Set<string>;
  onToggleAdGroup: (id: string) => void;
  selectedNode: SelectedNode | null;
  onSelectNode: (node: SelectedNode | null) => void;
}

export default function Sidebar({
  availablePlatforms,
  selectedPlatforms,
  onTogglePlatform,
  brands,
  selectedBrand,
  onBrandChange,
  filteredData,
  expandedCampaigns,
  onToggleCampaign,
  expandedAdGroups,
  onToggleAdGroup,
  selectedNode,
  onSelectNode,
}: Props) {
  return (
    <aside className="w-[290px] bg-white border-r border-gray-200 flex flex-col overflow-hidden shrink-0">
      {/* Platform filter */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
          媒体フィルター
        </p>
        <div className="flex gap-1.5 flex-wrap">
          {availablePlatforms.map((pid) => {
            const p = getPlatform(pid);
            const active = selectedPlatforms.has(pid);
            return (
              <button
                key={pid}
                onClick={() => onTogglePlatform(pid)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg cursor-pointer text-[10px] font-semibold whitespace-nowrap transition-all duration-200"
                style={{
                  border: active ? `2px solid ${p.color}` : "2px solid #E5E7EB",
                  background: active ? p.bg : "#fff",
                  color: active ? p.color : "#9CA3AF",
                }}
              >
                <PlatformIcon platformId={pid} size={18} />
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand filter */}
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
          ブランド
        </p>
        <select
          value={selectedBrand}
          onChange={(e) => onBrandChange(e.target.value)}
          className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-medium text-[#1A1A2E] cursor-pointer outline-none font-[inherit]"
        >
          <option value="all">すべてのブランド</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Tree nav */}
      <div className="flex-1 overflow-auto py-2">
        <div className="px-4 pb-2">
          <button
            onClick={() => onSelectNode(null)}
            className={`w-full text-left px-2 py-1.5 rounded-md border-none cursor-pointer text-xs font-semibold ${
              !selectedNode ? "bg-[#F0F0FF] text-[#4338CA]" : "bg-transparent text-gray-500"
            }`}
          >
            📋 すべての広告を表示
          </button>
        </div>
        {filteredData.map((campaign) => (
          <div key={campaign.id} className="mb-0.5">
            <button
              onClick={() => {
                onToggleCampaign(campaign.id);
                onSelectNode({ type: "campaign", id: campaign.id });
              }}
              className={`flex items-center gap-1.5 w-full px-4 py-1.5 border-none cursor-pointer text-xs font-semibold text-[#1A1A2E] text-left ${
                selectedNode?.id === campaign.id ? "bg-[#F8F8FC]" : "bg-transparent"
              }`}
            >
              <ChevronIcon open={expandedCampaigns.has(campaign.id)} />
              <PlatformIcon platformId={campaign.platform} size={20} />
              <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                {campaign.campaign}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                {campaign.adGroups.reduce((s, ag) => s + ag.ads.length, 0)}
              </span>
            </button>
            {expandedCampaigns.has(campaign.id) &&
              campaign.adGroups.map((ag) => (
                <div key={ag.id}>
                  <button
                    onClick={() => {
                      onToggleAdGroup(ag.id);
                      onSelectNode({ type: "adGroup", id: ag.id });
                    }}
                    className={`flex items-center gap-1.5 w-full pl-[42px] pr-4 py-1.5 border-none cursor-pointer text-[11px] font-medium text-left ${
                      selectedNode?.id === ag.id
                        ? "bg-[#F0F0FF] text-[#4338CA]"
                        : "bg-transparent text-gray-600"
                    }`}
                  >
                    <ChevronIcon open={expandedAdGroups.has(ag.id)} />
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                      {ag.name}
                    </span>
                    <span className="text-[10px] text-gray-400">{ag.ads.length}</span>
                  </button>
                  {expandedAdGroups.has(ag.id) &&
                    ag.ads.map((ad) => (
                      <div
                        key={ad.id}
                        className="pl-[62px] pr-4 py-1 text-[10px] text-gray-400 flex items-center gap-1.5"
                      >
                        <StatusBadge />
                        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                          {ad.headlines[0]}
                        </span>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
