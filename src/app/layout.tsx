import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | BUET EDC",
    default: "BUET Entrepreneurship Development Club",
  },
  description: "The official Entrepreneurship Development Club of Bangladesh University of Engineering and Technology (BUET). Fostering innovation, incubation, and industry connect.",
  openGraph: {
    title: "BUET Entrepreneurship Development Club",
    description: "The official Entrepreneurship Development Club of BUET. Fostering innovation, incubation, and industry connect.",
    url: "https://edc.buet.ac.bd",
    siteName: "BUET EDC",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "BUET EDC",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BUET Entrepreneurship Development Club",
    description: "The official Entrepreneurship Development Club of BUET.",
    images: ["https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop"],
  },
  icons: {
    icon: [
      { url: "/logo-light.png", href: "/logo-light.png" },
    ],
    apple: [
      { url: "/logo-light.png", href: "/logo-light.png" },
    ],
    shortcut: "/logo-light.png",
  },
};

import GlowCursor from "@/components/reactbits/GlowCursor";
import CustomAnimatedCursor from "@/components/CustomAnimatedCursor";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "sonner";
import { GalleryProvider } from "@/context/GalleryContext";
import { SponsorsProvider } from "@/context/SponsorsContext";
import NextTopLoader from "nextjs-toploader";
import InitialPreloader from "@/components/InitialPreloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} font-sans antialiased`}>
      <body className="min-h-full flex flex-col bg-[#001124] text-white font-sans overflow-x-hidden">
        <InitialPreloader />
        <NextTopLoader 
          color="#38bdf8" 
          height={2.5} 
          showSpinner={false} 
          shadow="0 0 12px #38bdf8"
        />
        <SponsorsProvider>
          <GalleryProvider>
            <GlowCursor
              color="#38bdf8"
              secondaryColor="#ffffff"
              trailLength={25}
              trailWidth={2}
              trailTaper={0.9}
              glowIntensity={0.8}
              glowSpread={0.35}
              hotspot={0.2}
              brightness={1.0}
              followSpeed={0.22}
              idleFade={true}
              idleTimeout={400}
            />
            <CustomAnimatedCursor />
            
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
            
            <Toaster 
              theme="dark"
              toastOptions={{
                style: {
                  background: 'rgba(1, 53, 101, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                }
              }}
            />
            
            <ScrollToTop />
          </GalleryProvider>
        </SponsorsProvider>
      </body>
    </html>
  );
}
