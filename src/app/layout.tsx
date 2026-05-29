import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Backroad Adventures - Discover Hidden Gems",
  description: "Your guide to antique stores, flea markets, diners, and hidden road trip adventures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-gray-900 text-gray-400 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>© 2024 Backroad Adventures. Explore the journey.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}