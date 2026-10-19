import type { Metadata } from "next";
import { Outfit, Bebas_Neue } from "next/font/google";
import SchemaMarkup from "@/components/SchemaMarkup";
import { Providers } from "@/components/Providers";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const siteConfig = {
  name: "Boba Express Niamey",
  title: "Boba Express Niamey | Le Meilleur Bubble Tea & Milkshake au Niger",
  description: "Le 1er bar à Bubble Tea artisanal de Niamey, Niger. Perles de tapioca fraîches du jour, matcha de cérémonie, milkshakes ultra gourmands et smoothies sahariens. Commande directe sur WhatsApp et livraison express.",
  url: "https://bobaexpress.vercel.app",
  keywords: [
    "Bubble Tea Niamey",
    "Boba Niger",
    "Bubble Tea artisanal Niamey",
    "Meilleur Boba Niamey",
    "Milkshake Niamey",
    "Smoothie Niamey",
    "Boba Express",
    "Boba Express Niamey",
    "Sortir à Niamey",
    "Yantala",
    "Plateau Niamey",
    "Niamey 2000",
    "Livraison Niamey",
    "Boisson fraîche Niamey",
    "Commande WhatsApp Niger"
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: "Boba Express Team",
      url: siteConfig.url,
    },
  ],
  creator: "Boba Express Niamey",
  publisher: "Boba Express Niamey",
  category: "food & drink",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_NE",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@boba_express_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon", type: "image/png" },
    ],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  other: {
    "geo.region": "NE-8",
    "geo.placename": "Niamey",
    "geo.position": "13.5127;2.1128",
    "ICBM": "13.5127, 2.1128",
    "telephone": "+22777394165",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <SchemaMarkup />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
