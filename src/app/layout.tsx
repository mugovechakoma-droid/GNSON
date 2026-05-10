import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { cookies } from "next/headers";

// Using Inter as the sleek sans-serif font
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "The HUB - Comprehensive Nursing Education",
  description: "Comprehensive Nursing Education & Management Web App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  const isLoggedIn = !!session;

  return (
    <html lang="en" className={`${inter.variable} font-sans h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <Header isLoggedIn={isLoggedIn} />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
