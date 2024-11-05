"use client";

import { Keyboard } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";

/**
 * Header component displaying the application logo and theme toggle
 * Includes a fancy animated gradient background
 */
export default function Header() {
  return (
    <header className="relative overflow-hidden">
      {/* Fancy gradient background with animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 animate-gradient-x -z-10" />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Keyboard className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                FlowType
              </h1>
              <p className="text-sm text-muted-foreground">
                Master the art of typing
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}