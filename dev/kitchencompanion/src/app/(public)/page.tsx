import { Button } from "@/components/ui/button";
import { RedirectButton } from "@/components/redirect-button";

export default function Home() {
  return (
    <div>
      <RedirectButton href='/login'>
        <Button>Connexion</Button>
      </RedirectButton>
    </div>
  );
}
