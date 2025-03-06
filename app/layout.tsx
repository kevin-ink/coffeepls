import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/app/storeProvider";
import SideNav from "@/components/sidenav";
import { getUsername } from "@/app/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coffee Pls",
  description: "Your coffee companion.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const username = await getUsername();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-screen h-screen antialiased`}
      >
        {username ? (
          <div className="grid grid-cols-[minmax(auto,1fr)_2fr] w-full h-full">
            <Providers>
              <SideNav username={username} />
              {children}
            </Providers>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
