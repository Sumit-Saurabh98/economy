"use client";
import Image from "next/image";
import { useState } from "react";
import lock from "@/../public/lock.svg";
import type { LoginFormData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("Both fields are required!");
      return;
    }

    // Store username and auth in localStorage - accept any credentials
    localStorage.setItem("auth", "true");
    localStorage.setItem("username", formData.username);
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="bg-gradient-to-br from-primary to-primary/80 p-4 rounded-2xl shadow-lg ring-4 ring-primary/10">
              <Image
                src={lock}
                alt="lock"
                width={40}
                height={40}
                className="brightness-0 invert"
              />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Sign in
          </CardTitle>
          <CardDescription className="text-base">
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert
                variant="destructive"
                className="border-2 animate-in fade-in-50"
              >
                <AlertDescription className="font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-2.5">
              <Label htmlFor="username" className="text-sm font-semibold">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="h-11 text-base border-2 focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="password" className="text-sm font-semibold">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="h-11 text-base border-2 focus:border-primary transition-all"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
