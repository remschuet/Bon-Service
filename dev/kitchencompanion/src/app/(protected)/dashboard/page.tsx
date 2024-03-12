import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
    const session = await auth();

    return (
        <>
            <h1>Dashboard</h1>
            <p>Bonjour, {session?.user.name}</p>
            <p>Votre adresse courriel est {session?.user.email}</p>
            <p>Votre type d'utilisateur est {session?.user.userType}</p>
            <p>Votre ID d'utilisateur est {session?.user.id}</p>
            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <Button type="submit">Sign Out</Button>
            </form>
        </>
    );
}
