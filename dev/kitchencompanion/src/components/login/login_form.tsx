import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  return (
    <div className='flex flex-col justify-center max-w-[500px]'>
      <CardHeader className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Connexion</h1>
        <p className='text-sm text-muted-foreground'>
          Entrez votre adresse courriel et votre mot de passe
        </p>
      </CardHeader>
      <CardContent>
        <form className='grid gap-4'>
          <div className='grid gap-1.5'>
            <div className='relative'>
              <Label
                className='sr-only'
                htmlFor='email'>
                Courriel
              </Label>
              <Input
                id='email'
                placeholder='nom@example.com'
                type='email'
                name='email'
              />
            </div>
            <div className='flex gap-1.5'>
              <Label
                className='sr-only'
                htmlFor='password'>
                Mot de passe
              </Label>
              <Input
                id='password'
                placeholder='Mot de passe'
                type='password'
                name='password'
              />
            </div>
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
      </CardContent>
    </div>
  );
}
