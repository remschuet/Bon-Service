"use client";

import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/validation/schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className='flex flex-col justify-center min-w-[500px]'>
      <CardHeader className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Connexion</h1>
        <p className='text-sm text-muted-foreground'>
          Entrez votre adresse courriel et votre mot de passe
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className='grid gap-4'
            onSubmit={form.handleSubmit(() => {})}>
            <div className='grid gap-1.5'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel
                      className='sr-only'
                      htmlFor='email'>
                      Courriel
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='nom@example.com'
                        type='email'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormLabel
                      className='sr-only'
                      htmlFor='password'>
                      Mot de passe
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='Mot de passe'
                        type='password'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <p className='px-5 text-[0.7rem] text-muted-foreground text-center'>
                <Link
                  className='underline italic font-semibold'
                  href='/forgot-password'>
                  Mot de passe oublié?
                </Link>
              </p>
            </div>
            <Button
              variant={"default"}
              type='submit'>
              Connexion
            </Button>
            <p className='text-[0.75rem] text-center font-normal text-muted-foreground'>
              Vous n'avez pas de compte?{" "}
              <Link
                className='underline italic font-semibold'
                href='/register'>
                Inscrivez-vous!
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </div>
  );
}
