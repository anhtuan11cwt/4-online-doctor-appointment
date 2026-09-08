"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  title: string;
  type?: "submit" | "button" | "reset";
  isLoading?: boolean;
  loadingTitle?: string;
};

export default function SubmitButton({
  title,
  type = "submit",
  isLoading = false,
  loadingTitle,
}: SubmitButtonProps) {
  return (
    <Button
      className="w-full bg-blue-700 text-white hover:bg-blue-800"
      disabled={isLoading}
      type={type}
    >
      {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
      {isLoading && loadingTitle ? loadingTitle : title}
    </Button>
  );
}
