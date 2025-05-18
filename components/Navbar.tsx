"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <nav className="w-full px-6 py-4 mb-4 shadow-md flex flex-col md:flex-row items-center justify-between custom-header">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        JobChaser
      </h1>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <p className="text-sm text-custom-text">
              Inloggad som: <strong>{user?.email}</strong>
            </p>
            <button
              onClick={() => router.push("/account")}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Mitt konto
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/signin")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Logga in
          </button>
          
        )}
      </div>
    </nav>
  );
};

export default Navbar;
