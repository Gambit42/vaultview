import { useQuery } from "@tanstack/react-query";
import currencyStore from "@/context/currencyStore";
import authClientInterceptor from "@/lib/authClientInterceptor";

const useGetUserTransactions = (currentPage: number) => {
  const { currency } = currencyStore();

  const { data, refetch } = useQuery({
    queryKey: ["get-user-transactions", currency, currentPage],
    queryFn: async () => {
      try {
        const result = await authClientInterceptor.get(
          `${
            process.env.NEXT_PUBLIC_BACKEND_API_URL
          }/user/user-transactions?page=${currentPage}&limit=${10}`,
          {
            withCredentials: true,
            timeout: 5000, // Increase timeout to 5 seconds
          }
        );

        console.log("result", result);

        return result.data;
      } catch (error) {
        console.log("error", error);
        return [];
      }
    },
    refetchOnWindowFocus: false, // default: true
    staleTime: 1000 * 60 * 10, // Data is considered fresh for 5 minutes
  });

  return { data, refetch };
};

export default useGetUserTransactions;
