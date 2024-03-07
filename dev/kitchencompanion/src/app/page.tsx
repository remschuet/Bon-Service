import { CreateUser } from "@/components/create_users";
import { DisplayUsers } from "@/components/display_users";

export default function Home() {
  return (
    <main className="grid place-content-center">
      <h1 className="font-bold text-center">Welcome to KitchenCompanion</h1>
      <p>A recipe and cost management application for the modern chef</p>
      <CreateUser />
      <DisplayUsers />
    </main>
  );
}
