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
          {current.map((path, index) => {
            const pathName = path.charAt(0).toUpperCase() + path.slice(1);
            const isLast = index === current.length - 1;

            return (
              <BreadcrumbItem
                className={`${isLast ? "text-xl font-semibold" : "text-lg"}`}
                key={index}>
                {isLast ? (
                  `${pathName}`
                ) : (
                  <BreadcrumbLink href={`/${path}`}>{pathName}</BreadcrumbLink>
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
