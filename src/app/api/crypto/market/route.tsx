import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const currency = searchParams.get("currency");
  const page = searchParams.get("page");
  try {
    const result = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=${process.env.COIN_GECKO_API_KEY}&vs_currency=${currency}&order=market_cap_desc&page=${page}&per_page=5&price_change_percentage=1h,24h,7d`
    );

    return Response.json({ status: 200, data: result.data });
  } catch (error: any) {
    console.log("ERRROr", error);
    return Response.json({ status: error.response.status });
  }
}
