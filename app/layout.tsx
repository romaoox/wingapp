import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "WING by QORVO — Gestão de Projetos para Agências";
  const description =
    "O centro de gestão de projetos da Qorvo Growth Marketing: operação, equipe, clientes, aprovações e performance em um só lugar.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pt_BR",
      images: [
        {
          url: `${origin}/og-wing-v3.png`,
          width: 1672,
          height: 941,
          alt: "WING by QORVO — Inteligência e visão para a operação da agência.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og-wing-v3.png`],
    },
    icons: {
      icon: "/wing-mark-v2.png",
      apple: "/wing-mark-v2.png",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
