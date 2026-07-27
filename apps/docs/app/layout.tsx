import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://wave-kit.jayhack-0.chatgpt.site"),
  title: "Wave Kit — the jay.ai component system",
  description:
    "A compact React component system for the visual language behind jay.ai.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Wave Kit",
    description: "The open component system behind jay.ai.",
    images: ["/design-og.png"],
  },
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
