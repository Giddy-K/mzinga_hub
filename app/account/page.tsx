"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import BeeAnimation from "../components/BeeAnimation"; // Custom or Lottie component

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      name: isSignup ? name : undefined,
      redirect: false,
    });

    setLoading(false);
    if (result?.ok) {
      router.push("/");
    } else {
      alert("Failed to authenticate");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 flex items-center justify-center overflow-hidden">
      {/* Bee Animations Layer */}
      <BeeAnimation /> {/* Include flying bee logic here */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md p-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-xl space-y-5 border border-white/20"
      >
        <h2 className="text-3xl font-bold text-center text-yellow-900">
          {isSignup ? "Create an Account" : "Karibu tena..."}
        </h2>

        {isSignup && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-600 text-white font-semibold py-2 rounded-lg transition hover:bg-yellow-700 disabled:opacity-60"
        >
          {loading ? "Loading..." : isSignup ? "Sign up" : "Login"}
        </button>

        <div className="text-center text-sm text-yellow-900">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="cursor-pointer font-medium underline hover:text-yellow-600"
          >
            {isSignup ? "Login" : "Sign up"}
          </span>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute w-full border-t border-yellow-300" />
          <span className="bg-white px-4 text-yellow-800 relative z-10">
            OR
          </span>
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/account/redirect" })}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 text-gray-700 bg-white py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <FaGoogle className="text-xl text-red-500" />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </motion.form>
    </div>
  );
}
