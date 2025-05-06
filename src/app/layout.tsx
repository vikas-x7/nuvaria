import type { Metadata } from "next";
import { Instrument_Serif, Poppins, Inter, Adamina } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const adamina = Adamina({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-adamina",
});

export const metadata: Metadata = {
  title: "Nuvaria",
  description: "An Ai image generator ",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${poppins.variable} ${inter.variable} ${adamina.variable}`}
    >

      
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
