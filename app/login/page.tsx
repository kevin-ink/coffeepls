"use client";
import { LoginForm } from "@/components/login-form";

export default function Login() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div>
        <h1 className="text-7xl">CoffeePls</h1>
        <p>Join the community now.</p>
      </div>
      <div className="w-full max-w-sm p-3 md:p-6">
        <LoginForm />
      </div>
    </div>
  );
}
