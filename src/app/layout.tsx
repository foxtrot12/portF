import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { translations } from "./common/translations";
import { getTitleCase } from "./common/jsUtils";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: getTitleCase(translations.chinmaya),
  description: translations.websiteDesc,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Head>
        <link rel="icon" href="public/favicon.ico" />
      </Head>
    </html>
  );
}
