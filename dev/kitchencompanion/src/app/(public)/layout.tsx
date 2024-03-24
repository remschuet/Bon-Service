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
          {" "}
          <div className='relative h-[100vh] md:grid lg:max-w-none lg:grid-cols-3 lg:px-0'>
            <div className='max-h-full flex-col bg-brand-dark bg-hero-rain p-12 text-white lg:flex dark:border-r'>
              <div className='text-3xl font-extrabold tracking-tight'>
                BON SERVICE
              </div>
              <div className='mt-auto'>
                <blockquote className=' max-w-[90%] space-y-2'>
                  <p className='sm:text-md'>
                    "Grâce à Bon Service, j'arrive à consacrer plus de temps à
                    l'élaboration de mes menus et moins de temps à la gestion de
                    ma cuisine."
                  </p>
                  <p className='text-sm font-semibold text-stone-300'>
                    Normand Laprise
                  </p>
                </blockquote>
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
