import type { Metadata } from "next";
import "./globals.css";
import "../styles/flashcards.css";

export const metadata: Metadata = {
  title: "PharmIA - Mémofiches conseil à l'officine",
  description: "Micro-apprentissage adaptatif et personnalisé du personnel de la pharmacie à travers des cas comptoir 100% pratiques",
  keywords: "pharmacie, formation, mémofiches, comptoir, officine, apprentissage, micro-apprentissage",
  authors: [{ name: "Pharmia" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-white">
      <body className="font-sans antialiased bg-white text-black min-h-screen">
        <div id="root" className="min-h-screen bg-white">
          {children}
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
