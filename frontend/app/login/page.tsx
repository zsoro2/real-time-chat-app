"use client";
import { useState } from "react";
import LoginRegisterLayout from "@/components/layouts/LoginRegister";
import LoginForm from "@/components/forms/login";

export default function LoginPage() {
  return (
    <LoginRegisterLayout
      title="Login"
      alternativeOptionText="Don't have an account? Register"
      alternativeOptionLink="/register"
    >
      <LoginForm />
    </LoginRegisterLayout>
  );
}
