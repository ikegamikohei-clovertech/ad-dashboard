"use client";

import { DisplayAd } from "@/lib/types";
import PlatformIcon from "./PlatformIcon";
import StatusBadge from "./StatusBadge";
import { ExternalLinkIcon } from "./Icons";

interface Props {
  ads: DisplayAd[];
}

const HEADERS = [
  "媒体", "ブランド", "ステータス",
  "見出し1", "見出し2", "見出し3", "見出し4",
  "説明文1", "説明文2", "説明文3",
  "キャンペーン", "広告グループ", "リンク先",
];

export default function AdTable({ ads }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50">
              {HEADERS.map((h) => (
                <th
                  key={h}
                  className="px-3 py-2.5 text-left font-bold text-gray-500 text-[10px] tracking-wider border-b border-gray-200 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ads.map((ad, i) => (
              <tr
                key={ad.id}
                className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFBFC]"}`}
              >
                <td className="px-3 py-2.5">
                  <PlatformIcon platformId={ad.platform} size={22} />
                </td>
                <td className="px-3 py-2.5 font-semibold text-[11px] text-gray-600 whitespace-nowrap">
                  {ad.brand}
                </td>
                <td className="px-3 py-2.5">
                  <StatusBadge />
                </td>
                {[0, 1, 2, 3].map((hi) => (
                  <td
                    key={`h${hi}`}
                    className={`px-3 py-2.5 max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap ${
                      hi === 0 ? "text-[#1A1A2E] font-semibold" : "text-gray-500"
                    }`}
                  >
                    {ad.headlines[hi] || <span className="text-gray-300">—</span>}
                  </td>
                ))}
                {[0, 1, 2].map((di) => (
                  <td
                    key={`d${di}`}
                    className="px-3 py-2.5 max-w-[180px] overflow-hidden text-ellipsis whitespace-nowrap text-gray-500"
                  >
                    {ad.descriptions[di] || <span className="text-gray-300">—</span>}
                  </td>
                ))}
                <td className="px-3 py-2.5 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-gray-600 text-[11px]">
                  {ad.campaignName}
                </td>
                <td className="px-3 py-2.5 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-gray-600 text-[11px]">
                  {ad.adGroupName}
                </td>
                <td className="px-3 py-2.5">
                  <a
                    href={ad.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4338CA] no-underline flex items-center gap-1 text-[11px] hover:underline"
                  >
                    URL <ExternalLinkIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
