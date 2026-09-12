import corsHeaders from "@/app/lib/cors";
import { NextResponse } from "next/server";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export async function GET() {
  const response = NextResponse.json(
    {
      message: "Logout Successful",
    },
    {
      status: 200,
      headers: corsHeaders,
    },
  );

  response.cookies.set("token", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
