'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // Optional for signup
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false); // toggle between login/signup
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      name: isSignup ? name : undefined,
      redirect: false, // manually handle redirect
    });

    if (result?.ok) {
      router.push("/"); // redirect after success
    } else {
      alert("Failed to authenticate");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4 bg-white shadow rounded">
      {isSignup && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        {isSignup ? "Sign up" : "Login"}
      </button>

      <p
        className="text-sm text-center cursor-pointer text-blue-600"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? "Already have an account? Login" : "New here? Sign up"}
      </p>
      <p>OR</p>
      <button
  type="button"
  onClick={() => signIn("google", { callbackUrl: "/account/redirect" })}
  className="w-full bg-red-500 text-white p-2 rounded"
>
  Sign in with Google
</button>
    </form>
  );
}
