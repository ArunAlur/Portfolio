import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arun Alur — Software Engineer",
  description: "Backend-focused software engineer building cloud-native services with Java, Spring Boot, and AWS.",
  openGraph: {
    type: "website",
    url: "https://arunalur.github.io/portfolio",
    title: "Arun Alur — Software Engineer",
    description: "Backend-focused software engineer building cloud-native services with Java, Spring Boot, and AWS.",
    siteName: "Arun Alur Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arun Alur — Software Engineer",
    description: "Backend-focused software engineer building cloud-native services with Java, Spring Boot, and AWS.",
  },
};

// themeColor belongs in viewport export (Next.js 14+)
export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SmoothScroll />
        <CustomCursor />
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  );
}
