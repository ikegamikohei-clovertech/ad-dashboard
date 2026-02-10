"use client";

import { DisplayAd } from "@/lib/types";
import { getPlatform } from "@/lib/platforms";
import PlatformIcon from "./PlatformIcon";
import StatusBadge from "./StatusBadge";
import HeadlineBlock from "./HeadlineBlock";
import DescriptionBlock from "./DescriptionBlock";
import { ExternalLinkIcon } from "./Icons";

interface Props {
  ad: DisplayAd;
}

export default function AdCard({ ad }: Props) {
  const p = getPlatform(ad.platform);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-px">
      {/* Image or platform header */}
      {ad.image ? (
        <div className="w-full h-40 bg-gray-100 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ad.image} alt="" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          className="w-full h-12 flex items-center px-4 gap-2"
          style={{ background: `linear-gradient(135deg, ${p.bg}, #fff)` }}
        >
          <PlatformIcon platformId={ad.platform} size={22} />
          <span className="text-[10px] font-semibold" style={{ color: p.color }}>
            {p.name}
          </span>
        </div>
      )}

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <HeadlineBlock headlines={ad.headlines} />
          <StatusBadge />
        </div>
        <DescriptionBlock descriptions={ad.descriptions} />

        {/* Meta info */}
        <div className="flex flex-col gap-1 pt-3 mt-3 border-t border-gray-100">
          {[
            {
              label: "媒体",
              content: (
                <span className="flex items-center gap-1">
                  <PlatformIcon platformId={ad.platform} size={16} />
                  <span className="font-semibold" style={{ color: p.color }}>{p.name}</span>
                </span>
              ),
            },
            {
              label: "ブランド",
              content: <span className="text-gray-600 font-semibold">{ad.brand}</span>,
            },
            {
              label: "キャンペーン",
              content: <span className="text-gray-600 truncate">{ad.campaignName}</span>,
            },
            {
              label: "広告グループ",
              content: <span className="text-gray-600 truncate">{ad.adGroupName}</span>,
            },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-1.5 text-[10px]">
              <span className="text-gray-400 font-semibold min-w-[70px]">{row.label}</span>
              {row.content}
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-[10px] mt-0.5">
            <span className="text-gray-400 font-semibold min-w-[70px]">リンク先</span>
            <a
              href={ad.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4338CA] truncate no-underline flex items-center gap-1 hover:underline"
            >
              {ad.url.replace(/https?:\/\//, "").substring(0, 40)}…
              <ExternalLinkIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
