"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { getAllKitchenByAdminId } from "@/db/data-access/kitchen";
import { __test__ } from "@/app/[locale]/(protected)/contacts/_action/contact-action";

export function ContactForm() {
  const [kitchen, setKitchen] = useState<string[]>([]);

  async function handleGetUser(formData: FormData) {}

  async function handleCreateContact(formData: FormData) {
    // __test__("clu2rmsyw00001bxxptqqgh9o");
  }

  return (
    <div>
      <Card className="w-[350px] h-[450px] grid place-content-center">
        <CardHeader>Create Contact (non fonctionnel)</CardHeader>
        En attente du currentIdUuser pour chercher les bonnes cuisines
        <CardContent>
          <form action={handleCreateContact} className="grid gap-2">
            <input
              type="text"
              name="userId"
              id="userId"
              placeholder="Enter userId"
            />
            <input type="text" name="name" id="name" placeholder="Enter name" />
            <input type="text" name="name" id="name" placeholder="Enter name" />
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Enter description"
            />
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter phoneNumber"
            />
            <input
              type="text"
              name="compteNumber"
              id="compteNumber"
              placeholder="Enter compteNumber"
            />
            est publique pour kitchen 1
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              value="isPublic"
            />
            <Button type="submit">Create contact</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
