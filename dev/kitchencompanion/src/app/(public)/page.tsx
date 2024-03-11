"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    function handleRedirect() {
        router.push("/login");
    }

    return (
        <div>
            <h1>Home</h1>
            <Button onClick={handleRedirect}>Login</Button>
        </div>
    );
}
