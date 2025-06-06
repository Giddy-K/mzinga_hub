import type { Metadata } from "next";
import Head from "next/head";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const workSans = localFont({
  src: [
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "MzingaHub | Smart Beekeeping Dashboard",
  description:
    "MzingaHub is a powerful beekeeping management tool to help farmers monitor apiaries, manage hives, and improve honey production.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "beekeeping",
    "honey production",
    "hive monitoring",
    "apiary management",
    "smart farming",
    "MzingaHub",
    "Bazenga",
  ],
  openGraph: {
    title: "MzingaHub",
    description:
      "MzingaHub helps beekeepers optimize hive health and track production.",
    url: "https://mzinga-hub.vercel.app",
    siteName: "MzingaHub",
    images: [
      {
        url: "/icon.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className={workSans.variable}>
        <SessionProvider>
          {/* <RedirectOnLogin /> */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
