"use client";

import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "@/lib/axiosInstance";

export default function LoginForm() {
  const router = useRouter();
  const {
    register: userRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await axios.post("/api/auth/login", {
        email,
        password,
      });

      router.push("/chat");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          {...userRegister("email", { required: true })}
          placeholder="m@example.com"
          type="email"
        />
        {errors.email && <p>Email is required</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          {...userRegister("password", { required: true })}
          type="password"
        />
        {errors.password && <p>Password is required</p>}
      </div>
      <Button className="w-full" type="submit">
        Register
      </Button>
    </form>
  );
}
