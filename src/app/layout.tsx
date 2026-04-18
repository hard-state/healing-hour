import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { BackgroundVisibilityProvider } from "@/contexts/BackgroundVisibilityContext";
import FixedBackgroundLayerWrapper from "@/components/FixedBackgroundLayerWrapper";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Massage Therapy London - Premium Wellness Services",
  description: "Experience ultimate relaxation and rejuvenation with our expert massage therapists in the heart of London",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased font-inter bg-warm-cream">
        <LoadingScreen />
        <BackgroundVisibilityProvider>
          <FixedBackgroundLayerWrapper />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppFloat />
        </BackgroundVisibilityProvider>
      </body>
    </html>
  );
}
