"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signInUser } from "../../redux/auth/authSlice";
import { useRouter } from "next/navigation";


const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user, loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      router.push("/jobs");
    }
  }, [user, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center custom-background text-custom-text">
    <div className="w-full max-w-md custom-header shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Logga in
      </h2>
      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            E-post
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 mt-2 text-black bg-white/90 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Lösenord
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 mt-2 text-black bg-white/90 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
        >
          {loading ? "Loggar in..." : "Logga in"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Har du inget konto?{" "}
        <a
          href="/signup"
          className="text-green-500 hover:underline dark:text-green-400"
        >
          Registrera dig här
        </a>
      </p>
    </div>
  </div>
);
};

export default SignIn;