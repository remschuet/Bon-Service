import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";
import { createUser } from "@/data_access/user";

export function RegisterForm() {
    async function handleCreateUser(formData: FormData) {
        "use server";

        const newUser = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        await createUser(newUser as User);
        revalidatePath("/");
    }

    return (
        <div className="container relative hidden h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Button
                className="inline-flex items-center justify-center whitespace-nowrap h-9 px-4 py-2 absolute right-4 top-4 md:right-8 md:top-8"
                variant={"link"}
            >
                Connexion
            </Button>
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-stone-700"></div>
                <div className="relative z-20 flex items-center text-lg font-medium">
                    Kitchen Companion
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className=" max-w-[70%] space-y-2">
                        <p className="text-lg">
                            “Grace à Kitchen Companion j'arrive à concacrer plus
                            de temps à l'élaboration de mes menus et moins de
                            temps à la gestion de ma cuisine.”
                        </p>
                        <footer className="text-sm">Normand Laprise</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8 justify-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Créer un compte
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Entrez votre adresse courriel pour créer un compte
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <form action={handleCreateUser} className="grid gap-6">
                            <div className="grid gap-1.5">
                                <Label className="sr-only" htmlFor="email">
                                    Courriel
                                </Label>
                                <Input
                                    id="email"
                                    placeholder="nom@example.com"
                                    type="email"
                                    name="email"
                                />
                                <Label className="sr-only" htmlFor="password">
                                    Mot de passe
                                </Label>
                                <Input
                                    id="password"
                                    placeholder="Mot de passe"
                                    type="password"
                                    name="password"
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex gap-3">
                                    <Checkbox id="terms" />
                                    <Label
                                        className="text-[0.8rem]"
                                        htmlFor="terms"
                                    >
                                        J'accèpte les conditions d'utilisation
                                    </Label>
                                </div>
                                <div className="flex gap-3">
                                    <Checkbox id="privacy" />
                                    <Label
                                        className="text-[0.8rem]"
                                        htmlFor="privacy"
                                    >
                                        J'accèpte la politique de
                                        confidentialité
                                    </Label>
                                </div>
                            </div>

                            <Button variant={"default"} type="submit">
                                Inscription
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
