import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/supabase";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NMS | Premium Aluminum, Fiber & Mosquito Net Solutions",
  description: "Discover premium, customized architectural aluminum doors, windows, durable glass-fiber partitions, composite kitchens, and luxury retractable pleated mosquito screens at NMS.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-neutral-950 text-white font-sans">
        <Navbar settings={settings} />
        <main className="flex-grow pt-20">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
