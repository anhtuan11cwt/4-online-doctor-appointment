"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-red-600 text-sm transition-colors hover:bg-red-50"
      onClick={() => signOut({ callbackUrl: "/login" })}
      type="button"
    >
      <LogOut className="h-4 w-4" />
      Đăng xuất
    </button>
  );
}
