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
          `/api/user/transactions/user-transactions?page=${currentPage}&limit=${10}`,
          {
            timeout: 5000, // Increase timeout to 5 seconds
          }
        );

        if (result.data.status === 401) {
          return console.log("Interceptor should accept this");
        }

        console.log("result po", result);

        return result.data.data;
      } catch (error) {
        console.log("error 123", error);
        return [];
      }
    },
    refetchOnWindowFocus: false, // default: true
    staleTime: 1000 * 60 * 10, // Data is considered fresh for 5 minutes
  });

  return { data, refetch };
};

export default useGetUserTransactions;
