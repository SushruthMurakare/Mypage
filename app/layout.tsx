import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ChatAssistant from "@/components/ChatAssistant";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const siteUrl = "https://sushruth.xyz";
const siteTitle = "Sushruth Murakare — Full-Stack Software Engineer";
const siteDescription =
  "Sushruth Murakare is a full-stack and AI software engineer with 4+ years of experience building production web and mobile applications across insurance, telecom, geospatial, and healthcare SaaS.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Sushruth Murakare",
  },
  description: siteDescription,
  keywords: [
    "Sushruth Murakare",
    "Sushruth Rao Murakare",
    "Sushruth",
    "Murakare",
    "Software Engineer",
    "Full Stack Developer",
    "Colorado School of Mines",
  ],
  authors: [{ name: "Sushruth Murakare", url: siteUrl }],
  creator: "Sushruth Murakare",
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "tXQ6gQBAp1TXXO5H2dE6Ip5_o9K5MS6mdVbpeTkRj5o",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Sushruth Murakare",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/Images/MyPic.png",
        width: 800,
        height: 800,
        alt: "Sushruth Murakare",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: ["/Images/MyPic.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sushruth Murakare",
  url: siteUrl,
  image: `${siteUrl}/Images/MyPic.png`,
  jobTitle: "Software Engineer",
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Colorado School of Mines" },
    {
      "@type": "CollegeOrUniversity",
      name: "Visvesvaraya Technological University",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/in/sushruthmurakare/",
    "https://github.com/SushruthMurakare",
    "https://devpost.com/SushruthMurakare",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF8F5]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <ChatAssistant />
      </body>
    </html>
  );
}
