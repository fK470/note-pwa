import { Inter } from "next/font/google";

import type { Metadata, Viewport } from "next";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "pNote";
const APP_DEFAULT_TITLE = "pNote";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION =
  "A lightweight and offline-capable note-taking app built using IndexedDB and PWA technologies. Organize, edit, and access your notes anytime, even without an internet connection. The app is optimized for fast performance and provides a seamless user experience across all devices. Enjoy features like data persistence, real-time syncing, and easy note categorization in a secure and user-friendly interface.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
