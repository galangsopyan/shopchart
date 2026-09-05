import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shopcart",
  description: "Modern Shopcart ecommerce experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        {children}

        <Footer />

        {/* Midtrans Snap - Sandbox */}
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={
            process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
          }
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}