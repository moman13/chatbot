import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AqlBot — The next generation of chatbot",
  description: "AI chatbot for your website. Custom knowledge base, easy embed, powered by Claude AI. Built specifically for modern brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="h-full bg-slate-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
