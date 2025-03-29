"use client";

import React, { useState, useContext, useRef } from "react";
import { LoginFormType, loginFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { AuthContext } from "@/context/AuthProvider";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import useLocalStorage from "@/hooks/useLocalStorage";

const LoginForm = () => {
  const [customError, setCustomError] = useState("");
  const LoginFormMethods = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  type FormData = z.infer<typeof loginFormSchema>;

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = LoginFormMethods;

  const refreshToken = useRefreshToken(setItem);

  const onFormSubmit = async (data: FormData) => {
    const { email, password } = data;

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setItem("user", JSON.stringify({ email: result.data.email }));
      router.push("/dashboard");

      // return router.push("/");
    } catch (error) {
      setCustomError("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <div className="max-w-[500px] mx-auto w-full">
      <div className="pb-4">
        <h1 className="font-dm text-[32px] font-bold">Sign In</h1>
        <p className="font-dm">Enter your email below to continue.</p>
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
            placeholder="Email"
          />
          <Input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="border black"
          />
          {customError && (
            <p className="text-red-600 font-dm pt-2">{customError}</p>
          )}
        </div>
        <Button variant="default" type="submit" className="w-full mt-6">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
