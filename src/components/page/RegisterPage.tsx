"use client";

import React from "react";
import RegisterForm from "@/components/organism/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 w-full">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
