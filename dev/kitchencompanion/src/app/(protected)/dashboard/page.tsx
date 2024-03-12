import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
    const session = await auth();

    return (
        <>
            <h1>Dashboard</h1>
            <p>{JSON.stringify(session)}</p>
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
