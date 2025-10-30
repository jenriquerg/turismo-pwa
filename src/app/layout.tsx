import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Perversoapp - Servicios Turísticos",
  description: "La Perversoapp es tu plataforma web progresiva para conectar viajeros con servicios turísticos locales: alojamientos, alimentos y experiencias únicas.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "La Perversoapp",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#10B981",
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
