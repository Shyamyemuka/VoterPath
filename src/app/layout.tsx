import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "@/lib/firebase"; // Initialize Firebase and Analytics
import "./globals.css";

export const metadata: Metadata = {
  title: "VoterPath - Your AI Guide to Indian Elections",
  description:
    "An AI-powered web application that helps Indian citizens understand the election process, register to vote, and exercise their democratic rights — in their own language.",
  keywords: [
    "Indian elections",
    "voter registration",
    "voting guide",
    "democracy",
    "EVM",
    "polling booth",
  ],
  openGraph: {
    title: "VoterPath - Your AI Guide to Indian Elections",
    description:
      "Understand the complete Indian election process with AI guidance",
    images: [
      {
        url: "https://framerusercontent.com/images/9zvwRJAavKKacVyhFCwHyXW1U.png",
        width: 1536,
        height: 1024,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
