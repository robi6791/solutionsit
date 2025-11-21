import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import grainImage from "@/public/images/grain.jpg";
import CookieConsent from '../app/CookieConsent';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "robisolutionsit",
  description: "Modern Portfolio with next.js",
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
        <div 
          className="fixed inset-0 -z-50 opacity-5" 
          style={{backgroundImage: `url(${grainImage.src})`, backgroundRepeat: 'repeat'}}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}