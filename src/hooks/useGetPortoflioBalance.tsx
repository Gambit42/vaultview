import { useQuery } from "@tanstack/react-query";
import currencyStore from "@/context/currencyStore";
import authClientInterceptor from "@/lib/authClientInterceptor";

const useGetPortfolioBalance = () => {
  const { currency } = currencyStore();

  const { data, refetch } = useQuery({
    queryKey: ["get-portfolio-balance", currency],
    queryFn: async () => {
      try {
        const result = await authClientInterceptor.get(
          `/api/user/user-portfolio`,
          {
            timeout: 5000, // Increase timeout to 5 seconds
          }
        );

        console.log("resultE", result);

        return result.data.data;
      } catch (error) {
        return null;
        console.log("error", error);
      }
    },
    refetchOnWindowFocus: false, // default: true
    staleTime: 1000 * 60 * 60 * 12, // 12 hours (43200000ms)
  });

  return { data, refetch };
};

export default useGetPortfolioBalance;
