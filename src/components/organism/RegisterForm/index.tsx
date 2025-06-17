"use client";

import React from "react";
import { RegisterFormType, registerFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const RegisterFormMethods = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
  });

  type FormData = z.infer<typeof registerFormSchema>;

  const { register, handleSubmit } = RegisterFormMethods;
  const router = useRouter();

  const onFormSubmit = async (data: FormData) => {
    console.log(data);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`,
        {
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      );

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[500px] mx-auto w-full my-auto">
      <div className="pb-4">
        <h1 className="font-dm text-[32px] font-bold">Sign Up</h1>
        <p className="font-dm">Fill out the form to cotinue.</p>
      </div>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col space-y-2 w-full">
          <Input
            {...register("email")}
            type="email"
            className="border black"
            placeholder="email"
          />

          <Input
            {...register("confirmPassword")}
            placeholder="password"
            type="password"
            className="border black"
          />
          <Input
            {...register("password")}
            placeholder="password"
            type="password"
            className="border black"
          />
        </div>
        <Button variant="default" type="submit" className="w-full mt-6">
          Submit
        </Button>
      </form>
      <h1 className="text-center py-4 font-poppins text-[14px]">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Sign in here
        </Link>
      </h1>
    </div>
  );
};

export default RegisterForm;
