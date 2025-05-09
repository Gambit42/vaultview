import axios from "axios";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const {
    tokenId,
    symbol,
    name,
    image,
    amount,
    originalPurchasePriceCurrency,
    originalPurchasePrice,
    purchasePriceInUsdt,
  } = await request.json();

  console.log("token", tokenId);

  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-transaction`,
      {
        tokenId,
        symbol,
        name,
        image,
        amount,
        originalPurchasePriceCurrency,
        originalPurchasePrice,
        purchasePriceInUsdt,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken?.value}`,
        },
      }
    );

    return Response.json({ status: 200, data: result.data });
  } catch (error: any) {
    return Response.json({ status: error.response.status });
  }
}
