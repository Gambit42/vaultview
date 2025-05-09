import axios from "axios";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/me`,
      {
        headers: {
          authorization: `Bearer ${accessToken?.value}`,
        },
      }
    );

    return Response.json({ status: 200, data: result.data });
  } catch (error: any) {
    console.log("ERRROr", error);
    return Response.json({ status: error.response.status });
  }
}
