"use client";

import React from "react";
import { RegisterFormType, registerFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";

const RegisterForm = () => {
  const RegisterFormMethods = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
  });

  type FormData = z.infer<typeof registerFormSchema>;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = RegisterFormMethods;

  const onFormSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`,
        {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col items-center justify-center"
      >
        <input
          {...register("email")}
          type="email"
          className="border black"
          placeholder="email"
        />{" "}
        <input
          {...register("confirmPassword")}
          placeholder="password"
          type="password"
          className="border black"
        />
        <input
          {...register("password")}
          placeholder="password"
          type="password"
          className="border black"
        />
        <button type="submit" className="rounded-full bg-blue-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
