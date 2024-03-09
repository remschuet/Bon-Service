import { RegisterForm } from "@/components/register/register_form";
import { RegisterLayout } from "@/components/register/register_layout";

export default function RegisterPage() {
  return (
    <div>
      <RegisterLayout>
        <RegisterForm />
      </RegisterLayout>
    </div>
  );
}
