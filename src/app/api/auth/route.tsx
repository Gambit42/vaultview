import axios from "axios";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "@/constants";

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const { email, password } = await request.json();

  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
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

    return Response.json({
      status: 200,
      data: {
        email: result.data.email,
      },
    });
  } catch (error) {
    console.log("error", error);

    return Response.json({ status: 500, data: "There was an error" });
  }
}
