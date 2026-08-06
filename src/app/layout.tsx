import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/supabase";
import { ThemeProvider } from "@/components/ThemeProvider";

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
  description:
    "Discover premium, customized architectural aluminum doors, windows, durable glass-fiber partitions, composite kitchens, and luxury retractable pleated mosquito screens at NMS.",
};

const themeInitScript = `
  (function() {
    try {
      var saved = localStorage.getItem('nms-theme');
      var supportDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (saved === 'dark' || (!saved && supportDark) || (saved === 'system' && supportDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white font-sans transition-colors duration-300">
        <ThemeProvider>
          <Navbar settings={settings} />
          <main className="flex-grow pt-20">{children}</main>
          <Footer settings={settings} />
        </ThemeProvider>
      </body>
    </html>
  );
}
