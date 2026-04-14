import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { text, communityId } = await req.json();

    if (!text) {
      return NextResponse.json({ message: "Text is required" }, { status: 400 });
    }

    await connectToDB();

    const newThread = new Thread({
      text,
      author: session.user.id,
      community: communityId || null,
    });

    const createdThread = await newThread.save();

    // Update User model
    await User.findByIdAndUpdate(session.user.id, {
      $push: { threads: createdThread._id },
    });

    return NextResponse.json(
      { message: "Thread created", thread: createdThread },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating thread:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
