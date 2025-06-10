"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Our Programs", href: "/#services" },
    { label: "Our Impact", href: "/#features" },
    { label: "Get Involved", href: "/#involved" },
    { label: "Our Blogs & News", href: "/#blog" },
    { label: "Contact Us", href: "/#contact-us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full transition-all duration-300 ease-in-out font-work-sans z-[100] ${
        scrolled ? "bg-white shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
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
            <Link
              href={item.href}
              key={idx}
              className="hover:text-[#8B4513] transition"
            >
              {item.label}
            </Link>
          ))}

          {session?.user ? (
            <>
              <Link href="/apiaries/dashboard">
                <button className="px-5 py-2 bg-gradient-to-r from-[#4B2E13] to-[#B76E29] text-white rounded-full hover:opacity-90">
                  Manage Apiaries
                </button>
              </Link>

              <button
                onClick={() => signOut({ redirectTo: "/" })}
                className="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                Log Out
              </button>

              <Link href={`/user/${session.user.email}`}>
                <Image
                  src={session.user.image || "/profile.png"}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </Link>
            </>
          ) : (
            <Link href="/account">
              <button className="ml-4 px-6 py-2 bg-gradient-to-r from-[#4B2E13] to-[#B76E29] text-white rounded-full">
                Access Account
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger (opens menu only) */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden border-black"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white/80 backdrop-blur-md shadow-lg transform transition-all duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <Image
            src="/icon.png"
            alt="Mzinga Logo"
            width={48}
            height={48}
            className="rounded-full border border-black"
          />
          {/* Single X icon to close the menu */}
          <button onClick={() => setIsOpen(false)} className="md:hidden">
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
              <Link href="/apiaries/dashboard" onClick={() => setIsOpen(false)}>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-[#4B2E13] to-[#B76E29] text-white rounded-full">
                  Manage Apiaries
                </button>
              </Link>

              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut({ redirectTo: "/" });
                }}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-full"
              >
                Log Out
              </button>

              <Link
                href={`/user/${session.user.email}`}
                onClick={() => setIsOpen(false)}
                className="mt-2 self-start"
              >
                <Image
                  src={session.user.image || "/profile.png"}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
            </>
          ) : (
            <Link href="/account" onClick={() => setIsOpen(false)}>
              <button className="w-full px-6 py-2 bg-gradient-to-r from-[#4B2E13] to-[#B76E29] text-white rounded-full mt-4">
                Access Account
              </button>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
