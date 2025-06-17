import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  try {
    cookieStore.set({
      name: "accessToken",
      value: "",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/", // include path when deleting
      maxAge: 0,
    });

    cookieStore.set({
      name: "refreshToken",
      value: "",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 0,
    });

    return Response.json({ status: 200, data: "User logged out." });
  } catch (error) {
    console.log("WHAT ERR", error);
  }
}
