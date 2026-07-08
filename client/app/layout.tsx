import type { Metadata } from "next";
// import { Instrument_Serif, Inter } from "next/font/google";
import { Bricolage_Grotesque, Hanken_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MonityIO | Operations Intelligence",
  description:
    "Real-time operational intelligence, monitoring, compliance, and decision support for modern organizations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${hanken.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}