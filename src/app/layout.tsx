import type { Metadata } from "next";
import { League_Spartan, Baloo_2 } from "next/font/google";
import CustomCursor from './components/CustomCursor';
import Navigation from "./components/Navigation";
import "./globals.css";
import Footer from "./components/Footer";
import TawkMessenger from '@/app/components/TawkMessenger';
import GoogleAnalytics from '@/app/components/GoogleAnalytics'

const poppins = League_Spartan({
  subsets: ['latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

const baloo2 = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-baloo2'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pinova.in'),
  title: {
    default: "Pinova Technologies | Web Development & Design Agency",
    template: "%s | Pinova Technologies"
  },
  description: "Leading web development and design agency specializing in custom websites, mobile apps, and digital solutions for businesses worldwide.",
  keywords: ["web development", "web design", "mobile apps", "digital agency", "SEO services", "UI/UX design"],
  authors: [{ name: "Pinova Technologies" }],
  creator: "Pinova Technologies",
  publisher: "Pinova Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/android-chrome-192x192.png'
  },
  openGraph: {
    title: 'Pinova Technologies',
    description: 'Transform your digital presence with our expert web development and design services',
    url: 'https://pinova.in',
    siteName: 'Pinova Technologies',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pinova Technologies'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pinova Technologies',
    description: 'Transform your digital presence with our expert web development and design services',
    creator: '@pinovatech',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://pinova.in" />
        <meta name="theme-color" content="#5E43FF" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <GoogleAnalytics />
      </head>
      <body className={`${poppins.variable} ${baloo2.variable} overflow-x-hidden`}>
        <Navigation />
        {children}
        <TawkMessenger />  
        <CustomCursor />
        <Footer/>
      </body>
    </html>
  );
}
