import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./layouts/navbar";
import Footer from "./layouts/footer";

export const metadata: Metadata = {
  title: "PPI Warwick",
  description: "PPI Warwick Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
