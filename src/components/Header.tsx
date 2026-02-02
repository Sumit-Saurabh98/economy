"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Search } from "lucide-react";

function Header() {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <div className="h-16 bg-white border-b shadow-sm flex items-center px-8 justify-between gap-4">
      {/* Left side - IDH logo and Main logo */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {/* IDH Logo */}
        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-sm">IDH</span>
        </div>

        <Image
          src="https://economy.indiadatahub.com/static/svg/whitename.svg"
          alt="logo"
          width={160}
          height={36}
          className="drop-shadow-sm"
        />
      </div>

      {/* Center - Search bar */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-9 h-9 w-full"
            disabled
          />
        </div>
      </div>

      {/* Right side - User dropdown */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {username && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-10 px-3 hover:bg-accent"
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{username}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Logged in
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Header;
