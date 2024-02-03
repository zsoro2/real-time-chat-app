"use client";

import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const {
    register: userRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { register, isError } = useUser();

  const onSubmit = async ({ username, email, password }) => {
    try {
      await register(username, email, password);
      router.push("/chat");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          {...userRegister("username", { required: true })}
          placeholder="Enter your username"
        />
        {errors.username && <p>Username is required</p>}
      </div>
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
