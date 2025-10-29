import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TurismoPWA - Servicios Turísticos Locales",
  description: "Plataforma web progresiva para conectar viajeros con servicios turísticos locales: alojamientos, alimentos y experiencias.",
  manifest: "/manifest.json",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#10B981",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TurismoPWA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/manifest.json" type="image/x-icon" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
