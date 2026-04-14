import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import mongoose from "mongoose";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, password, username, name } = await req.json();
    console.log("Registering user:", { email, username, name }); // Added log

    if (!email || !password || !username || !name) {
      console.log("Missing required fields"); // Added log
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Connecting to DB..."); // Added log
    await connectToDB();
    console.log("Connected to DB successfully"); // Added log

    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      console.log("User already exists"); // Added log
      return NextResponse.json(
        { message: "User with this email or username already exists!" },
        { status: 400 }
      );
    }

    console.log("Hashing password..."); // Added log
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate a unique ID for the user
    const id = new mongoose.Types.ObjectId().toString();

    const newUser = new User({
      id,
      email,
      username,
      name,
      password: hashedPassword,
    });

    console.log("Saving user..."); // Added log
    await newUser.save();
    console.log("User saved successfully"); // Added log

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error during registration:", (error as Error).message, (error as Error).stack); // Enhanced log
    return NextResponse.json(
      { message: "An error occurred during registration: " + ((error as Error).message || "Unknown error") },
      { status: 500 }
    );
  }
}
