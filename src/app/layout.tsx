import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import ProviderContent from "@/redux/ProviderContent";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Todo Web Application",
  description:
    "A simple and efficient web application to manage your daily tasks.",
  keywords: ["todo", "tasks", "productivity", "web app"],
  authors: [{ name: "Manik Hossain", url: "https://manikdev.vercel.app/" }],
  metadataBase: new URL("https://manikdev.vercel.app/"),
  openGraph: {
    title: "Todo Web Application",
    description: "Manage your daily tasks efficiently with our Todo Web App",
    url: "https://manikdev.vercel.app/",
    siteName: "Todo Web App",
    images: [
      {
        url: "/assets/Authentication/profile.png",
        width: 1200,
        height: 630,
        alt: "Todo Web App",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProviderContent>{children}</ProviderContent>
      </body>
    </html>
  );
}
