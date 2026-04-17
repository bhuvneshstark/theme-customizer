import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Theme Customizer — Live Storefront Prototyping",
  description: "A dashboard where merchants can visually tweak a mock storefront. Change colors, typography, and layout with instant live preview.",
  keywords: ["Theme Customizer", "Storefront", "E-commerce", "HTML", "CSS", "Bootstrap", "jQuery", "PHP", "JavaScript", "Prototyping"],
  authors: [{ name: "Bhuvnesh" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Theme Customizer — Live Storefront Prototyping",
    description: "A dashboard where merchants can visually tweak a mock storefront with instant live preview.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Theme Customizer — Live Storefront Prototyping",
    description: "A dashboard where merchants can visually tweak a mock storefront with instant live preview.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
