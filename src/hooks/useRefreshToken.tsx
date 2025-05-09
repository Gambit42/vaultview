"use client";

import axios from "axios";

export const useRefreshToken = (
  setItem: (key: string, value: string) => void
) => {
  const refreshToken = async () => {
    try {
      const res = await axios.post(`/api/auth/refresh-tokens`);
      console.log(res.data);
      setItem("accessToken", res.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };
  return refreshToken;
};
