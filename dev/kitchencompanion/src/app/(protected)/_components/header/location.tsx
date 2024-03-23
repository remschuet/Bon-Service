"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

import { useCurrentPath } from "@/app/_hooks/useCurrentPath";

export function Location() {
  const current = useCurrentPath();

  return (
    <div className='flex items-center space-x-2'>
      <Breadcrumb>
        <BreadcrumbList className='flex items-center'>
          {current.map((p, index) => {
            const pathName = p.charAt(0).toUpperCase() + p.slice(1);
            const isLast = index === current.length - 1;

            return (
              <BreadcrumbItem
                className={`${isLast ? "text-xl font-semibold" : "text-lg"}`}
                key={index}>
                {isLast ? (
                  `${pathName}`
                ) : (
                  <BreadcrumbLink href={`/${p}`}>{pathName}</BreadcrumbLink>
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
