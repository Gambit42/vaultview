import { useQuery } from "@tanstack/react-query";
import currencyStore from "@/context/currencyStore";
import authClientInterceptor from "@/lib/authClientInterceptor";

const useGetUserTransactionsByTokenId = (tokenId: string) => {
  const { currency } = currencyStore();

  const { data, refetch } = useQuery({
    queryKey: ["get-user-transactions-by-token-id", currency],
    queryFn: async () => {
      try {
        const result = await authClientInterceptor.get(
          `/api/user/transactions/user-transactions-by-token?tokenId=${tokenId}`,
          {
            timeout: 5000, // Increase timeout to 5 seconds
          }
        );

        if (result.data.status === 401) {
          console.log("Interceptor should accept this");
          return [];
        }

        console.log("result po", result);
        return result.data?.data ?? [];
      } catch (error) {
        console.log("error 123", error);
        return [];
      }
    },
    enabled: !!tokenId && !!currency,
    refetchOnWindowFocus: false, // default: true
    staleTime: 1000 * 60 * 10, // Data is considered fresh for 5 minutes
  });

  return { data, refetch };
};

export default useGetUserTransactionsByTokenId;
