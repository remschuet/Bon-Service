import "@/app/globals.css";

import { auth } from "@/auth";
import { UserSession } from "@/lib/type";

import type { Metadata } from "next";
import { Lato } from "next/font/google";

import { ThemeProvider } from "@/providers/theme";
import { NavigationStateProvider } from "@/providers/navigation-state";

import { Toaster } from "@/components/ui/toaster";
import { Nagivation } from "@/app/(protected)/_components/navigation/navigation";
import { PageLayout } from "@/app/(protected)/_components/page-layout";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html
      lang='en'
      className='scrollbar-none'
      suppressHydrationWarning>
      <body className={lato.className}>
        <main>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            disableTransitionOnChange>
            <div className='flex h-screen'>
              <NavigationStateProvider>
                <Nagivation />
                <PageLayout session={session as UserSession}>
                  {children}
                </PageLayout>
              </NavigationStateProvider>
            </div>
          </ThemeProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
