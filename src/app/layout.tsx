"use client";
import "./globals.css";
import ConditionalHeader from "../components/ConditionalHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
      >
        <ConditionalHeader />
        {children}
      </body>
    </html>
  );
}
