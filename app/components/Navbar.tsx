"use client";

import Link from "next/link";
import Image from "next/image";
// import { auth, signOut, signIn, } from "@/auth"; // Server-side, see workaround below
import { signOut, signIn, useSession } from "next-auth/react"; // For client-side session
import { Menu, X } from "lucide-react";
import { useState } from "react";


export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  // const session = await auth();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Our Programs", href: "/programs" },
    { label: "Our Impact", href: "/impact" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Our Blogs & News", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 left-0 w-full bg-transparent shadow-md z-50 font-work-sans">
      <nav className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/icon.png"
            alt="Mzinga Hub Logo"
            width={64}
            height={64}
            className="rounded-full border border-black"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-[#4B2E13] font-work-sans">
          {navItems.map((item, idx) => (
            <Link href={item.href} key={idx} className="hover:text-[#8B4513] transition">
              {item.label}
            </Link>
          ))}

          {session?.user ? (
            <>
              <Link href="/account/create">Create Account</Link>
              <button
                onClick={() => signOut({ redirectTo: "/" })}
                className="text-[#8B4513]"
              >
                Log Out
              </button>
              <Link href={`/user/${session?.user?.email}`}>
                {session.user.name}
              </Link>
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="ml-4 px-6 py-2 bg-gradient-to-r from-[#4B2E13] to-[#B76E29] text-white rounded-full"
            >
              {/* &gt;  */}
              Access Account
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden border-black">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <Image
            src="/icon.png"
            alt="Mzinga Logo"
            width={48}
            height={48}
            className="rounded-full border border-black"
          />
          <button onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>
        <ul className="p-6 flex flex-col gap-4 text-[#4B2E13] font-medium">
          {navItems.map((item, idx) => (
            <Link href={item.href} key={idx} onClick={() => setIsOpen(false)}>
              <li className="border-b pb-2">{item.label}</li>
            </Link>
          ))}
          {session?.user ? (
            <>
              <Link href="/account/create">Create Account</Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut({ redirectTo: "/" });
                }}
              >
                Log Out
              </button>
              <Link href={`/user/${session.user.email}`}>
                {session.user.name}
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                signIn("google");
              }}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-[#4B2E13] to-[#B76E29] text-white rounded-ss-full"
            >
              {/* &gt;  */}
              Access Account
            </button>
          )}
        </ul>
      </div>
    </header>
  );
}
