import Link from "next/link";
import React from "react";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import Google from "next-auth/providers/google";




const Navbar = async () => {
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

              <button onClick={signOut}>
                <span>LogOut</span>
              </button>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <button onClick={async () => {await signIn(provider?: Google)}}>
              <span>Access Account</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
