import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "@/app/globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Bon Service",
  description: "Une application de cuisine pour les chef moderne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fr'>
      <body className={lato.className}>
        <main className='grid place-content-center'>
          <div className='relative h-[100vh] md:grid lg:max-w-none lg:grid-cols-3 lg:px-0'>
            <div className='max-h-full w-[35vw] flex-col bg-brand-hover bg-hero-rain p-12 shadow-xl text-white lg:flex dark:border-r'>
              <div className='text-[2.5rem] font-extrabold text-stone-800'>
                bon service.
              </div>
            </div>
            <div className='lg:px-8 grid place-content-center col-span-2'>
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
