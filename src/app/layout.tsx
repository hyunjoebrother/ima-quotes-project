import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

declare global {
  interface Window {
    kakao: any;
  }
}

import Head from "next/head";

export const metadata: Metadata = {
  title: "지금, 명언 (Ima-Quotes)",
  description: "만약에 지금, 내일 세상이 끝난다면 당신한테 어울리는 명언은?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <body className={inter.className}>{children}</body>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
    </html>
  );
}
