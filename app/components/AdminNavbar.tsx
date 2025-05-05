"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function AdminNavbar() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/account/redirect">
          <Image
            src="/icon.png"
            alt="Mzinga Hub Logo"
            width={48}
            height={48}
            className="rounded-full border border-black"
          />
        </Link>

        <div className="flex items-center gap-4">
          {/* Logout Button */}
          {session?.user && (
            <button
              onClick={() => signOut({ redirectTo: "/" })}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          )}

          {/* Profile Image */}
          {session?.user && (
            <Link href={`/user/${session.user.email}`}>
              <Image
                src={session.user.image || "/profile.png"}
                alt="User"
                width={40}
                height={40}
                className="rounded-full border border-gray-300"
              />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
