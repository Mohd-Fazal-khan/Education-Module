import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Optics - The Study of Light | Interactive Physics Learning",
  description:
    "Interactive optics learning app for Class 10 students. Explore reflection, refraction, lenses, mirrors, and human eye with hands-on simulations.",
  keywords:
    "optics, physics, education, Class 10, reflection, refraction, lenses, mirrors, human eye, interactive learning",
  authors: [{ name: "Interactive Physics Learning" }],
  viewport: "width=device-width, initial-scale=1",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
