import { useMutation } from "@tanstack/react-query";
import authClientInterceptor from "@/lib/authClientInterceptor";
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

const useSignout = () => {
  const { setUser } = useContext(AuthContext);
  return useMutation({
    mutationKey: ["signout"],
    mutationFn: async () => {
      try {
        const response = await authClientInterceptor.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/signout`,
          {},
          { withCredentials: true }
        );

        return response.data; // Extracting the data directly from the response
      } catch (error) {
        console.error("Unable to logout at this time", error);
        throw error;
      }
    },
    onSuccess: () => {
      setUser({ email: "", image: "" });
      localStorage.removeItem("user");
    },
  });
};

export default useSignout;
