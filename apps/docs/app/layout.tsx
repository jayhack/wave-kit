import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const themeInitScript = `(function(){var t=null;try{t=localStorage.getItem("wave-theme")}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var r=document.documentElement;r.dataset.theme=t;r.style.colorScheme=t})();`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:4173",
  ),
  title: "Wave Kit | the jay.ai component system",
  description:
    "A compact React component system for the visual language behind jay.ai.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Wave Kit",
    description: "The open component system behind jay.ai.",
    images: [
      {
        url: "/design-og.png",
        width: 1200,
        height: 630,
        alt: "wave-kit over the expanding cellular WaveField",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script id="wave-theme-init" strategy="beforeInteractive">
        {themeInitScript}
      </Script>
      <body>{children}</body>
    </html>
  );
}
