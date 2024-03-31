"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Kitchen } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function KitchenCard(kitchen: Kitchen) {
  return (
    <Link href={`/kitchen/${kitchen.name}`}>
      <Card>
        <CardHeader className='bg-brand-light rounded-t-lg mb-6'>
          <CardTitle>{kitchen.name}</CardTitle>
          <CardDescription>{kitchen.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge
            variant={
              "default"
            }>{`Objectif de coût: ${kitchen.costObjective}%`}</Badge>
        </CardContent>
      </Card>
    </Link>
  );
}
