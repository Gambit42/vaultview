"use client";

import React from "react";
import axios from "axios";

const page = () => {
  const handleTest = async () => {
    const result = await axios.get("/api/me");
    console.log("result", result.data);
  };
  return (
    <div>
      <h1 onClick={handleTest}>TEt</h1>
    </div>
  );
};

export default page;
