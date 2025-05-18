"use client";

import React, { useEffect }  from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { signUpUser } from "../../redux/auth/authSlice";
import { useRouter } from "next/navigation";

interface SignUpFormData {
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();

  useEffect(() => {
    if (user) {
      console.log("User signed up:", user);
      router.push("/jobs");
    }
  }, [user, router]);

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    dispatch(signUpUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center custom-background text-custom-text">
      <div className="w-full max-w-md custom-header shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Skapa konto</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">E-post</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 text-black bg-white/90 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("email", { required: true })}
            />
            {errors.email && <span className="text-red-500 text-sm">Fältet är obligatoriskt</span>}
          </div>
          <div>
            <label className="block text-sm font-medium">Lösenord</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 text-black bg-white/90 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              {...register("password", { required: true })}
            />
            {errors.password && <span className="text-red-500 text-sm">Fältet är obligatoriskt</span>}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
          >
            {loading ? "Registrerar..." : "Registrera"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Har du redan ett konto?{" "}
          <a href="/signin" className="text-green-400 hover:underline">
            Logga in här
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;