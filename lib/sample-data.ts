import { Campaign } from "./types";
import { PLATFORM_MASTER } from "./platforms";
import type { DashboardData } from "./types";

const sampleCampaigns: Campaign[] = [
  {
    id: "google_search-ブランドA-春コレクション2026_検索",
    platform: "Google Search",
    brand: "ブランドA",
    campaign: "春コレクション2026_検索",
    adGroups: [
      {
        id: "google_search-ブランドA-春コレクション2026_検索-0",
        name: "ワンピース_ブランド指名",
        ads: [
          {
            id: "ad-0",
            headlines: ["新作ワンピース入荷｜ブランドA公式", "春の限定コレクション開催中", "公式オンラインストア", "送料無料キャンペーン中"],
            descriptions: [
              "2026年春の最新ワンピースが勢揃い。公式オンラインストアで送料無料キャンペーン実施中。",
              "人気のフラワープリントから上品なソリッドカラーまで豊富なラインナップ。",
              "サイズ交換無料。14日間返品OK。安心してお買い物いただけます。",
            ],
            url: "https://brand-a.example.com/onepiece/spring",
            image: null,
          },
          {
            id: "ad-1",
            headlines: ["ブランドA｜春ワンピース特集", "今だけ20%OFF"],
            descriptions: ["人気のフラワープリントワンピースが期間限定価格。公式サイト限定カラーも。"],
            url: "https://brand-a.example.com/onepiece/sale",
            image: null,
          },
        ],
      },
      {
        id: "google_search-ブランドA-春コレクション2026_検索-1",
        name: "アウター_一般KW",
        ads: [
          {
            id: "ad-2",
            headlines: ["春アウター特集｜軽量ジャケット", "通勤にもデイリーにも", "オンライン限定デザイン"],
            descriptions: [
              "薄手で持ち運びやすい春アウターが豊富。オンライン限定デザインも多数ご用意。",
              "撥水加工・UVカット機能付き。春の通勤スタイルをアップデート。",
            ],
            url: "https://brand-a.example.com/outer/spring",
            image: null,
          },
        ],
      },
    ],
  },
  {
    id: "google_pmax-ブランドA-ブランドA_P-MAX_春夏",
    platform: "Google P-MAX",
    brand: "ブランドA",
    campaign: "ブランドA_P-MAX_春夏",
    adGroups: [
      {
        id: "google_pmax-ブランドA-ブランドA_P-MAX_春夏-0",
        name: "アセットグループ_春コレクション",
        ads: [
          {
            id: "ad-3",
            headlines: ["ブランドA 春の新作", "最大30%OFF開催中", "公式ストア限定", "送料無料"],
            descriptions: [
              "春の新作アイテムが続々入荷。トレンドのパステルカラーからベーシックまで。",
              "公式オンラインストアなら全品送料無料。サイズ交換も無料で安心。",
              "期間限定セール開催中。お気に入りをお得に手に入れるチャンス。",
            ],
            url: "https://brand-a.example.com/pmax/spring",
            image: "https://placehold.co/1200x628/E6F4EA/166534?text=Brand+A+PMAX",
          },
        ],
      },
    ],
  },
  {
    id: "yahoo_search-ブランドB-ブランドB_YSA_春夏",
    platform: "Yahoo! Search",
    brand: "ブランドB",
    campaign: "ブランドB_YSA_春夏",
    adGroups: [
      {
        id: "yahoo_search-ブランドB-ブランドB_YSA_春夏-0",
        name: "レディースバッグ_指名",
        ads: [
          {
            id: "ad-4",
            headlines: ["ブランドB公式｜新作バッグ", "春夏コレクション"],
            descriptions: ["洗練されたデザインの新作バッグが登場。公式ストアなら全品送料無料。"],
            url: "https://brand-b.example.com/bags/ss",
            image: null,
          },
          {
            id: "ad-5",
            headlines: ["レザーバッグ特集｜ブランドB", "名入れサービス対応", "ギフトラッピング無料"],
            descriptions: [
              "上質なレザーバッグをオンラインで。ギフトラッピング・名入れも承ります。",
              "全商品1年保証付き。修理サポートも充実。",
            ],
            url: "https://brand-b.example.com/bags/leather",
            image: null,
          },
        ],
      },
      {
        id: "yahoo_search-ブランドB-ブランドB_YSA_春夏-1",
        name: "財布・小物_一般",
        ads: [
          {
            id: "ad-6",
            headlines: ["春の新作財布｜ブランドB"],
            descriptions: ["コンパクト財布からロングウォレットまで。新色パステルカラーも人気。"],
            url: "https://brand-b.example.com/wallet",
            image: null,
          },
        ],
      },
    ],
  },
  {
    id: "yahoo_display-ブランドC-ブランドC_YDA_リターゲティング",
    platform: "Yahoo! Display",
    brand: "ブランドC",
    campaign: "ブランドC_YDA_リターゲティング",
    adGroups: [
      {
        id: "yahoo_display-ブランドC-ブランドC_YDA_リターゲティング-0",
        name: "サイト訪問者_30日",
        ads: [
          {
            id: "ad-7",
            headlines: ["お気に入りアイテム、まだあります"],
            descriptions: ["閲覧した商品がカートでお待ちしています。今なら送料無料クーポン配布中。"],
            url: "https://brand-c.example.com/cart",
            image: "https://placehold.co/600x315/F5E6FF/7B0099?text=Brand+C+YDA",
          },
        ],
      },
    ],
  },
  {
    id: "meta-ブランドD-ブランドD_Instagram_認知",
    platform: "Meta Ads",
    brand: "ブランドD",
    campaign: "ブランドD_Instagram_認知",
    adGroups: [
      {
        id: "meta-ブランドD-ブランドD_Instagram_認知-0",
        name: "興味関心_ファッション女性25-34",
        ads: [
          {
            id: "ad-8",
            headlines: ["この春、自分らしいスタイルを"],
            descriptions: ["トレンドを取り入れつつ、あなたらしさを。ブランドDの春コレクションをチェック。"],
            url: "https://brand-d.example.com/spring",
            image: "https://placehold.co/1080x1080/E8D5F5/6B21A8?text=Brand+D+IG",
          },
          {
            id: "ad-9",
            headlines: ["春の着回し7コーデ", "スタイリスト監修"],
            descriptions: [
              "プロのスタイリストが提案する春の着回しコーデ。ブランドDで叶えるワードローブ。",
              "毎週新コーデ更新中。フォローして最新スタイルをチェック。",
            ],
            url: "https://brand-d.example.com/coordinate",
            image: "https://placehold.co/1080x1080/D5E8F5/1E40AF?text=Brand+D+Coord",
          },
        ],
      },
      {
        id: "meta-ブランドD-ブランドD_Instagram_認知-1",
        name: "LAL_購入者類似_1%",
        ads: [
          {
            id: "ad-10",
            headlines: ["人気No.1アイテムはこれ"],
            descriptions: ["今季もっとも売れているアイテムをご紹介。数量限定のため、お早めに。"],
            url: "https://brand-d.example.com/best",
            image: "https://placehold.co/1080x1080/F5E6D5/A0522D?text=Brand+D+Best",
          },
        ],
      },
    ],
  },
  {
    id: "meta-ブランドE-ブランドE_Facebook_CV獲得",
    platform: "Meta Ads",
    brand: "ブランドE",
    campaign: "ブランドE_Facebook_CV獲得",
    adGroups: [
      {
        id: "meta-ブランドE-ブランドE_Facebook_CV獲得-0",
        name: "カート放棄_リターゲティング",
        ads: [
          {
            id: "ad-11",
            headlines: ["お買い忘れはありませんか？", "カート商品が値下げ中"],
            descriptions: ["カートに入れたアイテムが値下げ中。クーポンコード SPRING10 で更に10%OFF。"],
            url: "https://brand-e.example.com/cart-reminder",
            image: "https://placehold.co/1200x628/D5F5E6/166534?text=Brand+E+Cart",
          },
        ],
      },
      {
        id: "meta-ブランドE-ブランドE_Facebook_CV獲得-1",
        name: "新規_ブロード配信",
        ads: [
          {
            id: "ad-12",
            headlines: ["初回購入で送料無料"],
            descriptions: ["ブランドEのオンラインストアへようこそ。初めてのお買い物は全品送料無料でお届け。"],
            url: "https://brand-e.example.com/welcome",
            image: "https://placehold.co/1200x628/F5D5D5/A01616?text=Brand+E+Welcome",
          },
        ],
      },
    ],
  },
];

export const sampleDashboardData: DashboardData = {
  platforms: PLATFORM_MASTER,
  campaigns: sampleCampaigns,
  fetchedAt: new Date().toISOString(),
};
