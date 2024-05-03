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

export function KitchenCard({
  kitchen,
  chefName,
  member,
}: {
  kitchen: Kitchen;
  chefName?: string;
  member?: number;
}) {
  return (
    <Link href={`/kitchen/${kitchen.name}?id=${kitchen.id}`}>
      <Card className="min-h-[200px]">
        <CardHeader className="bg-brand-light rounded-t-lg mb-6 min-h-[125px] space-y-4">
          <CardTitle>{kitchen.name}</CardTitle>
          <CardDescription>{kitchen.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 max-w-[50%]">
          {chefName !== undefined ? (
            <CardDescription>{`Chef: ${chefName}`}</CardDescription>
          ) : null}
          {chefName !== undefined ? (
            <Badge
              className="block"
              variant={"default"}
            >{`${member} membres`}</Badge>
          ) : null}
          {chefName === undefined ? (
            <Badge
              variant={"default"}
            >{`Objectif de coût: ${kitchen.costObjective}%`}</Badge>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
}
