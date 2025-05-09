import { useQuery } from "@tanstack/react-query";
import authClientInterceptor from "@/lib/authClientInterceptor";

const useGetPortfolioHistory = (overViewValue: string) => {
  const { data, refetch } = useQuery({
    queryKey: ["get-user-portfolio-history", overViewValue],
    queryFn: async () => {
      try {
        const result = await authClientInterceptor.get(
          `/api/user/user-portfolio-history?limit=${Number(overViewValue)}`,
          {
            timeout: 5000, // Increase timeout to 5 seconds
          }
        );

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

export default useGetPortfolioHistory;
