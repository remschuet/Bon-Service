import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KitchenCompanion",
  description: "Votre portail",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='grid place-content-center'>{children}</main>
        <Toaster />
        {/* Component ShadcnUI qui permet de faire des popup style toast dans le
        bas a droite de l'ecran */}
      </body>
    </html>
  );
}
