import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Johnpaul — Full-stack Developer",
  description:
    "Portfolio of Johnpaul, a full-stack developer specializing in modern web applications with React, Next.js, TypeScript, and Node.js.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/general-sans"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
