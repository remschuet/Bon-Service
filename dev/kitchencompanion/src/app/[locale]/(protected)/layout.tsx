import "@/app/globals.css";

import { auth } from "@/auth";
import { UserSession } from "@/lib/type";

import type { Metadata } from "next";
import { Lato } from "next/font/google";

import { NavigationStateProvider } from "@/providers/navigation-state";

import { Toaster } from "@/components/ui/toaster";
import { Nagivation } from "@/app/[locale]/(protected)/_components/navigation/navigation";
import { PageLayout } from "@/app/[locale]/(protected)/_components/page-layout";
import { SessionProvider } from "@/providers/session";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Bon Service - Portail",
  description: "Votre portail",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    locale: string;
    recipeBookId: string;
    recipeId?: string;
    kitchenId?: string;
  };
}) {
  const session = await auth();

  const locale = params.locale;

  return (
    <html
      lang={locale}
      className='scrollbar-none'
      suppressHydrationWarning>
      <body className={lato.className}>
        <SessionProvider session={session as UserSession}>
          <main>
            <div className='flex h-screen'>
              <NavigationStateProvider>
                <Nagivation />
                <PageLayout params={params}>{children}</PageLayout>
              </NavigationStateProvider>
            </div>
          </main>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
