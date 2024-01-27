import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component() {
  return (
    <div className="w-full h-screen bg-gray-100 dark:bg-gray-800">
      <div className="flex items-center justify-center h-full">
        <div className="mx-auto w-lg space-y-6 bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold mb-5">Register</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your information below to create an account
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" required type="password" />
            </div>
            <Button className="w-full" type="submit">
              Register
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link className="underline" href="#">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
