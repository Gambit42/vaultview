import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const currency = searchParams.get("currency") || "";

  try {
    const result = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=${process.env.COIN_GECKO_API_KEY}`
    );

    const currentValue = result.data.market_data.current_price[currency];

    return Response.json({ status: 200, data: currentValue });
  } catch (error: any) {
    console.log("ERRROr", error);
    return Response.json({ status: error.response.status });
  }
}
