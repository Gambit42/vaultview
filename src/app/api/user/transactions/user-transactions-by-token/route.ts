import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  const { searchParams } = new URL(req.url);
  const tokenId = searchParams.get("tokenId");

  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/user-transactions-by-token?tokenId=${tokenId}`,
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
