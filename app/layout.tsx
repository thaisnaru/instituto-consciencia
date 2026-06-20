import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instituto Consciência | Medicina da Floresta",
  description:
    "Um espaço de cura, autoconhecimento e reconexão com a sabedoria ancestral da floresta. Conheça o Instituto Consciência.",
  keywords: "Instituto Consciência, ayahuasca, medicina da floresta, autoconhecimento, retiro espiritual",
  openGraph: {
    title: "Instituto Consciência",
    description: "Medicina da floresta, sabedoria ancestral e autoconhecimento.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
