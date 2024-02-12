"use client";
import LoginRegisterLayout from "@/components/layouts/LoginRegister";
import RegisterForm from "@/components/forms/register";

export default function RegisterPage() {
  return (
    <LoginRegisterLayout
      title="Register"
      alternativeOptionText="Already have an account? Login"
      alternativeOptionLink="/login"
    >
      <RegisterForm />
    </LoginRegisterLayout>
  );
}
