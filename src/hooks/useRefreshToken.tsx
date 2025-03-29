"use client";

import axios from "axios";
import useLocalStorage from "@/hooks/useLocalStorage";

export const useRefreshToken = (
  setItem: (key: string, value: string) => void
) => {
  const refreshToken = async () => {
    //@ts-ignore

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-tokens`,
        null,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setItem("accessToken", res.data.accessToken);
    } catch (error) {
      console.log(error);
    }

    //@ts-ignore
  };
  return refreshToken;
};
