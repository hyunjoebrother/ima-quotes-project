import type { Metadata } from "next";
import Script from "next/script";

import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

declare global {
  interface Window {
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: "지금, 당신의 명언 (Ima-Quotes)",
  description: "만약에 지금, 내일 세상이 끝난다면 당신한테 어울리는 명언 카드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
    </html>
  );
}
