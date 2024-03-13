import { Button } from "@/components/ui/button";
import { RedirectButton } from "@/components/redirect-button";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <RedirectButton href='/login'>
        <Button>Login</Button>
      </RedirectButton>
    </div>
  );
}
