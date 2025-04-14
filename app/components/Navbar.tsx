import Link from "next/link";
import React from "react";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import Google from "next-auth/providers/google";
import { redirect } from "next/dist/server/api-utils";

const Navbar = async () => {
  const GOOGLE_CLIENT_ID = process.env.AUTH_GOOGLE_ID!;
  const GOOGLE_CLIENT_SECRET = process.env.AUTH_GOOGLE_SECRET!;
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/icon.png"
            alt="Mzinga Hub"
            width={100}
            height={100}
            border-radius={50}
          />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/account/create">
                <span>Create Account</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">LogOut</button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button type="submit">Access Account</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
