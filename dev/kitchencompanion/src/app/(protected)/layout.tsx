import "@/app/globals.css";

import type { Metadata } from "next";
import { Lato } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import DashboardHeader from "@/app/(protected)/_components/layout-header";
import { CurrentPathProvider } from "@/app/(protected)/_components/header/current-pathname";

import { auth } from "@/auth";
import { UserSession } from "@/lib/type";
import { LayoutNavigation } from "@/app/(protected)/_components/layout-navigation";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "KitchenCompanion",
  description: "Votre portail",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang='en'>
      <body className={lato.className}>
        <main>
          <div className='flex w-full h-screen'>
            <LayoutNavigation />
            <div className='w-full'>
              <CurrentPathProvider>
                <DashboardHeader session={session as UserSession} />
              </CurrentPathProvider>
              <div>{children}</div>
            </div>
          </div>
        </main>
        <Toaster />
        {/* Component ShadcnUI qui permet de faire des popup style toast dans le
        bas a droite de l'ecran */}
      </body>
    </html>
  );
}
