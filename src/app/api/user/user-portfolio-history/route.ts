import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit");

  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/user-portfolio-history?limit=${limit}`,
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
