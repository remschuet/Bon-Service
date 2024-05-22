"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Location({
  params,
}: {
  params: {
    locale: string;
    recipeBookId: string;
    recipeId?: string;
    kitchenId?: string;
  };
}) {
  const current = decodeURIComponent(usePathname())
    .split("/")
    .filter((p) => p);
  return (
    <div className='flex items-center space-x-2'>
      <Breadcrumb>
        <BreadcrumbList className='flex items-center text-foreground'>
          {current.map((p, index) => {
            let pathName = p.charAt(0).toUpperCase() + p.slice(1);

            pathName = pathName.split("?")[0];

            if (pathName === "Marche") {
              pathName = "Marché";
            }

            const isLast = index === current.length - 1;
            const isFirst = index === 0;

            return (
              <BreadcrumbItem
                className={cn(isLast ? "text-xl font-semibold" : "text-lg")}
                key={index}>
                {isLast ? (
                  `${pathName}`
                ) : (
                  <BreadcrumbLink href={isFirst ? `/${p}` : `${p}`}>
                    {pathName}
                  </BreadcrumbLink>
                )}
                <BreadcrumbSeparator>
                  <ChevronRight />
                </BreadcrumbSeparator>
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
