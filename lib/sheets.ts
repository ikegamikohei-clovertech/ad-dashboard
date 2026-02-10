import { google } from "googleapis";
import type { PlatformMaster } from "./types";

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      ),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

export interface RawRow {
  brand: string;
  platform: string;
  campaign: string;
  ad_group: string;
  headline1: string;
  headline2: string;
  headline3: string;
  headline4: string;
  description1: string;
  description2: string;
  description3: string;
  url: string;
  image_url: string;
}

export async function fetchPlatformMaster(): Promise<PlatformMaster[]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "媒体マスタ!A:G",
  });

  const rows = res.data.values;
  if (!rows || rows.length < 2) return [];

  return rows
    .slice(1)
    .map((row) => ({
      id: row[0] || "",
      name: row[1] || "",
      color: row[2] || "#6B7280",
      icon: row[3] || "??",
      bg: row[4] || "#F3F4F6",
      parent: row[5] || "",
      sortOrder: Number(row[6]) || 99,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function fetchAdRows(): Promise<RawRow[]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "入稿データ";

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:M`,
  });

  const rows = res.data.values;
  if (!rows || rows.length < 2) return [];

  return rows.slice(1).map((row) => ({
    brand: row[0] || "",
    platform: row[1] || "",
    campaign: row[2] || "",
    ad_group: row[3] || "",
    headline1: row[4] || "",
    headline2: row[5] || "",
    headline3: row[6] || "",
    headline4: row[7] || "",
    description1: row[8] || "",
    description2: row[9] || "",
    description3: row[10] || "",
    url: row[11] || "",
    image_url: row[12] || "",
  }));
}
