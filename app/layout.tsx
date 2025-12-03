import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import grainImage from "@/public/images/grain.jpg";
import CookieConsent from "../app/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO dla freelancera IT
export const metadata: Metadata = {
  metadataBase: new URL("https://robisolutionsit.com"),
  title: {
    default:
      "Robert Senenko – Freelancer IT, Fullstack Developer, DevOps | Robi Solutions IT",
    template: "%s | Robi Solutions IT",
  },
  description:
    "Freelancer IT – serwis komputerowy, pomoc zdalna, fullstack development, DevOps i administracja serwerami. Pomagam osobom prywatnym i małym firmom w rozwiązywaniu problemów IT oraz tworzeniu aplikacji.",
  keywords: [
    "freelancer IT",
    "specjalista IT",
    "serwis komputerowy",
    "naprawa komputerów",
    "programista freelance",
    "fullstack developer",
    "devops freelancer",
    "administracja serwerami",
    "pomoc IT zdalna",
    "usługi IT",
  ],
  authors: [{ name: "Robert Senenko" }],
  creator: "Robert Senenko",
  publisher: "Robi Solutions IT",
  alternates: {
    canonical: "https://robisolutionsit.com",
  },
  openGraph: {
    title:
      "Robert Senenko – Freelancer IT, Fullstack Developer, DevOps | Robi Solutions IT",
    description:
      "Freelancer IT oferujący serwis komputerowy, tworzenie aplikacji webowych, DevOps i administrację serwerami. Zdalna pomoc IT oraz wsparcie dla małych firm.",
    url: "https://robisolutionsit.com",
    siteName: "Robi Solutions IT",
    type: "website",
    locale: "pl_PL",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Robi Solutions IT – Freelancer IT, Fullstack Developer, DevOps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robi Solutions IT – Freelancer IT i Fullstack Developer",
    description:
      "Freelancer IT, serwis komputerowy, programowanie fullstack, DevOps oraz administracja serwerami.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 🔹 JSON-LD dla freelancera (schema.org Person)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Robert Senenko",
    jobTitle: "Freelancer IT, Fullstack Developer, DevOps",
    url: "https://robisolutionsit.com",
    email: "kontakt@robisolutionsit.com",
    telephone: "+48 502 316 393",
    description:
      "Freelancer IT oferujący serwis komputerowy, tworzenie aplikacji webowych, pomoc zdalną, DevOps i administrację serwerami.",
    sameAs: [
      "https://facebook.com/TwojProfil", // podmień jak będziesz miał
      "https://robisolutionsit.com",
    ],
  };

  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* tło z grainem */}
        <div
          className="fixed inset-0 -z-50 opacity-5"
          style={{
            backgroundImage: `url(${grainImage.src})`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* JSON-LD do SEO – może być w body */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
