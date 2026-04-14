import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";

export const runtime = "nodejs";

export async function GET() {
  const diagnostics = {
    database: "Unknown",
    env: {
      MONGO_URI: process.env.MONGO_URI ? "Present" : "Missing",
      MONGODB_URI: process.env.MONGODB_URI ? "Present" : "Missing",
      AUTH_SECRET: process.env.AUTH_SECRET ? "Present" : "Missing",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "Present" : "Missing",
      AUTH_URL: process.env.AUTH_URL ? "Present" : "Missing",
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "Not Set",
    },
    error: null as string | null,
  };

  try {
    await connectToDB();
    diagnostics.database = "Connected Successfully";
  } catch (error: any) {
    diagnostics.database = "Connection Failed";
    diagnostics.error = error.message;
  }

  return NextResponse.json(diagnostics);
}
