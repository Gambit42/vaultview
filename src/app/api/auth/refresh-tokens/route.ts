import axios from "axios";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "@/constants";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken");

  console.log(`refreshToken`, refreshToken?.value);

  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-tokens`,
      null,
      {
        headers: {
          authorization: `Bearer ${refreshToken?.value}`,
        },
      }
    );

    cookieStore.set({
      name: "accessToken",
      value: result.data.accessToken as string,
      httpOnly: true, // Prevents JavaScript access
      secure: true,
      sameSite: "none",
      maxAge: ACCESS_TOKEN_MAX_AGE, // 15 mins
    });

    cookieStore.set({
      name: "refreshToken",
      value: result.data.refreshToken as string,
      httpOnly: true, // Prevents JavaScript access
      secure: true,
      sameSite: "none",
      maxAge: REFRESH_TOKEN_MAX_AGE, // 15 mins
    });

    console.log("RESULT DATA", result.data);
    console.log("result refresh", result.data.accessToken);
    return Response.json({ status: 201, data: "Refreshed tokens" });
  } catch (error) {
    console.log("WHAT ERR", error);
  }
}
