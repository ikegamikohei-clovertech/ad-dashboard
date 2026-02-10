import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "入稿内容ダッシュボード",
  description: "広告入稿内容の確認ダッシュボード",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${dmSans.variable} ${notoSansJP.variable} antialiased`} style={{ fontFamily: "var(--font-dm-sans), var(--font-noto-sans-jp), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
