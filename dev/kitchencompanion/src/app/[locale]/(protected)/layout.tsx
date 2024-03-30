import "@/app/globals.css";

import { auth } from "@/auth";
import { UserSession } from "@/lib/type";

import type { Metadata } from "next";
import { Lato } from "next/font/google";

import { ThemeProvider } from "@/providers/theme";
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
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await auth();

  return (
    <html
      lang={locale}
      className='scrollbar-none'
      suppressHydrationWarning>
      <body className={lato.className}>
        <SessionProvider session={session as UserSession}>
          <main>
            <ThemeProvider
              attribute='class'
              defaultTheme='light'
              disableTransitionOnChange>
              <div className='flex h-screen'>
                <NavigationStateProvider>
                  <Nagivation />
                  <PageLayout>{children}</PageLayout>
                </NavigationStateProvider>
              </div>
            </ThemeProvider>
          </main>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
