"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "../../backend/auth";

interface SignInFormData {
  email: string;
  password: string;
}

const SigninPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    console.log("Form submitted with data:", data); 
    try {
      const user = await signIn(data.email, data.password);
      console.log("Signed in user:", user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password", { required: true })} />
          {errors.password && <span>This field is required</span>}
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SigninPage;