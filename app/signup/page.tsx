"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUp } from "../../backend/auth";

interface SignUpFormData {
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      const user = await signUp(data.email, data.password);
      console.log("Signed up user:", user);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;