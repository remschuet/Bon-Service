"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function RegisterLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function handleRedirect() {
    router.push("/");
  }

  return (
    <div className='relative h-[100vh] md:grid lg:max-w-none lg:grid-cols-3 lg:px-0'>
      <Button
        className='absolute right-4 top-4 md:right-8 md:top-8'
        variant={"link"}
        onClick={handleRedirect}>
        Connexion
      </Button>
      <div className='h-full flex-col bg-stone-700 p-12 text-white lg:flex dark:border-r'>
        <div className='text-xl font-medium'>Kitchen Companion</div>
        <div className='mt-auto'>
          <blockquote className=' max-w-[90%] space-y-2'>
            <p className='sm:text-md'>
              “Grace à Kitchen Companion j'arrive à concacrer plus de temps à
              l'élaboration de mes menus et moins de temps à la gestion de ma
              cuisine.”
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
  );
}
