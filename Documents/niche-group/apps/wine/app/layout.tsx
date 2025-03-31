import type { Metadata } from "next";
import "../styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Playfair_Display as FontSerif } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Wine Enthusiasts",
  description: "A community for wine lovers and enthusiasts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontSerif.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
} 