import { DefaultJWT, DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      onboardingPage?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    onboardingPage?: string | null;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    onboardingPage?: string | null;
    role?: string;
  }
}
