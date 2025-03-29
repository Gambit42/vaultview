import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import currencyStore from "@/context/currencyStore";

const useGetUSDTPrice = () => {
  const { currency } = currencyStore();

  const { data, refetch } = useQuery({
    queryKey: ["get-usdt", currency],
    queryFn: async () => {
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/crypto/tether?currency=${currency}`
        );

        console.log("result usdt", result);

        return result.data;
      } catch (error) {
        console.log("error", error);
      }
    },
    refetchOnWindowFocus: false, // default: true
    staleTime: 1000 * 60 * 60 * 12, // 12 hours (43200000ms)
  });

  return { data, refetch };
};

export default useGetUSDTPrice;
