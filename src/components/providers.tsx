"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { OnboardingContextProvider } from "@/context/onboarding-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <TooltipProvider>
        <SessionProvider>
          <OnboardingContextProvider>{children}</OnboardingContextProvider>
        </SessionProvider>
      </TooltipProvider>
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}
