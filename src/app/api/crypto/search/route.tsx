import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");
  const currency = searchParams.get("currency");

  try {
    const result = await axios.get(
      `https://api.coingecko.com/api/v3/search?query=${query}&x-cg-demo-api-key=${process.env.COIN_GECKO_API_KEY}`
    );

    if (result.data.coins.length <= 0) {
      return Response.json({ status: 404, data: [] });
    }

    const coinIdsArray = result.data.coins
      .slice(0, 5)
      //@ts-expect-error no type
      .map((element) => element.id);

    const coinIdQuery = coinIdsArray.join(",");

    const marketResult = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=${process.env.COIN_GECKO_API_KEY}&vs_currency=${currency}&order=market_cap_desc5&price_change_percentage=1h,24h,7d&ids=${coinIdQuery}`
    );

    return Response.json({ status: 200, data: marketResult.data });
  } catch (error: any) {
    console.log("ERRROr", error);
    return Response.json({ status: error.response.status });
  }
}
