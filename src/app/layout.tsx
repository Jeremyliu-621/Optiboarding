import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Optimal AI — AI Code Review with Full Codebase Context",
  description: "Optibot reviews every PR with full cross-repo context. Catch breaking changes, security issues, and risky patterns before they ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-black min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
