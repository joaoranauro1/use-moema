import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const inter = localFont({
  src: [
    {
      path: "../fonts/InterVariable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "use.moema — Compactos Sofisticados da Nova Geração",
  description:
    "Prédio boutique em Moema com studios e compactos premium de 20 a 56 m². 53 unidades, 14 pavimentos. A 1,8 km do Parque Ibirapuera. Entrega dezembro 2027.",
  keywords: [
    "use.moema",
    "apartamento Moema",
    "studio Moema",
    "compacto premium São Paulo",
    "investimento imobiliário",
    "prédio boutique",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "use.moema — Compactos Sofisticados da Nova Geração",
    description:
      "Prédio boutique em Moema com studios e compactos premium pensados para uso real.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
