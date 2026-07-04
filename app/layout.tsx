import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import ChatAssistant from "@/components/ChatAssistant";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Sushruth Murakare — Full-Stack Engineer",
  description:
    "Personal portfolio of Sushruth Murakare, full-stack software engineer and MS CS student at Colorado School of Mines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF8F5]">
        {children}
        <ChatAssistant />
      </body>
    </html>
  );
}
