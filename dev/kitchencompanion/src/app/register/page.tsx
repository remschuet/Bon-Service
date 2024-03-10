import { RegisterForm } from "@/components/register/register-form";
import { RegisterLayout } from "@/components/register/register-layout";

export default function RegisterPage() {
  return (
    <div>
      <RegisterLayout>
        <RegisterForm />
      </RegisterLayout>
    </div>
  );
}
