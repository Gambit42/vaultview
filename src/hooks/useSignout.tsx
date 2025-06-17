import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const useSignout = () => {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  return useMutation({
    mutationKey: ["signout"],
    mutationFn: async () => {
      try {
        const res = await axios.post(`/api/auth/signout`);

        return res.data; // Extracting the data directly from the response
      } catch (error) {
        console.error("Unable to logout at this time", error);
        throw error;
      }
    },
    onSuccess: () => {
      setUser({ email: "", image: "" });
      localStorage.removeItem("user");
      router.push("/login");
    },
  });
};

export default useSignout;
