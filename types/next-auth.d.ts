import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name?:  string | null;
      email?: string | null;
      image?: string | null;
      role?:  "admin" | "user";
      uid?:   string;
    };
  }

  interface User {
    role?: "admin" | "user";
    uid?:  string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid?:  string;
    role?: "admin" | "user";
  }
}
