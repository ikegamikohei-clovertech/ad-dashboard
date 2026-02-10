import type { Campaign } from "./types";
import type { RawRow } from "./sheets";

export function transformToCampaigns(rows: RawRow[]): Campaign[] {
  const campaignMap = new Map<string, Campaign>();

  rows.forEach((row, index) => {
    const campaignKey = `${row.platform}-${row.brand}-${row.campaign}`;

    if (!campaignMap.has(campaignKey)) {
      campaignMap.set(campaignKey, {
        id: campaignKey,
        platform: row.platform,
        brand: row.brand,
        campaign: row.campaign,
        adGroups: [],
      });
    }

    const campaign = campaignMap.get(campaignKey)!;

    let adGroup = campaign.adGroups.find((ag) => ag.name === row.ad_group);
    if (!adGroup) {
      adGroup = {
        id: `${campaignKey}-${campaign.adGroups.length}`,
        name: row.ad_group,
        ads: [],
      };
      campaign.adGroups.push(adGroup);
    }

    adGroup.ads.push({
      id: `ad-${index}`,
      headlines: [row.headline1, row.headline2, row.headline3, row.headline4].filter(Boolean),
      descriptions: [row.description1, row.description2, row.description3].filter(Boolean),
      url: row.url,
      image: row.image_url || null,
    });
  });

  return Array.from(campaignMap.values());
}
