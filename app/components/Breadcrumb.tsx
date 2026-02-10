"use client";

import { Campaign, SelectedNode } from "@/lib/types";

interface Props {
  selectedNode: SelectedNode | null;
  filteredData: Campaign[];
  onSelect: (node: SelectedNode | null) => void;
}

export default function Breadcrumb({ selectedNode, filteredData, onSelect }: Props) {
  return (
    <div className="px-6 pb-3 text-xs text-gray-400">
      <span
        className={`cursor-pointer ${
          selectedNode ? "font-normal text-gray-400" : "font-semibold text-[#4338CA]"
        }`}
        onClick={() => onSelect(null)}
      >
        すべて
      </span>
      {selectedNode && (() => {
        const c = filteredData.find((c) =>
          selectedNode.type === "campaign"
            ? c.id === selectedNode.id
            : c.adGroups.some((ag) => ag.id === selectedNode.id)
        );
        if (!c) return null;
        const ag =
          selectedNode.type === "adGroup"
            ? c.adGroups.find((a) => a.id === selectedNode.id)
            : null;
        return (
          <>
            <span className="mx-1.5">/</span>
            <span
              className={`cursor-pointer ${
                !ag ? "font-semibold text-[#4338CA]" : "font-normal text-gray-400"
              }`}
              onClick={() => onSelect({ type: "campaign", id: c.id })}
            >
              {c.campaign}
            </span>
            {ag && (
              <>
                <span className="mx-1.5">/</span>
                <span className="font-semibold text-[#4338CA]">{ag.name}</span>
              </>
            )}
          </>
        );
      })()}
    </div>
  );
}
