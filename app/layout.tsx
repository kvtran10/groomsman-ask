import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Message for You",
  description: "You've been selected.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
