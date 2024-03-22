import "@/app/globals.css";

import type { Metadata } from "next";
import { Lato } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationStateProvider } from "@/app/_providers/navigation-provider";

import { auth } from "@/auth";
import { UserSession } from "@/lib/type";
import { Nagivation } from "@/app/(protected)/_components/layout-navigation";
import { PageLayout } from "@/app/(protected)/_components/layout-page";

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
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          <main>
            <div className='flex h-screen'>
              <NavigationStateProvider>
                <Nagivation />
                <PageLayout session={session as UserSession}>
                  {children}
                </PageLayout>
              </NavigationStateProvider>
            </div>
          </main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
