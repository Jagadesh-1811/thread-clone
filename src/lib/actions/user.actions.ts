"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";

export async function fetchUser(userId: string) {
  try {
    await connectToDB();

    return await User.findOne({ id: userId });
  } catch (error: unknown) {
    throw new Error(`Failed to fetch user: ${(error as Error).message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    await connectToDB();

    // Find all threads authored by the user with the given userId
    const userWithThreads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });

    return userWithThreads;
  } catch (error: unknown) {
    throw new Error(`Failed to fetch user posts: ${(error as Error).message}`);
  }
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  image,
  username,
}: {
  userId: string;
  bio: string;
  name: string;
  path: string;
  image: string;
  username: string;
}): Promise<void> {
  try {
    await connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
      },
      { upsert: true }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: unknown) {
    throw new Error(`Failed to create/update user: ${(error as Error).message}`);
  }
}
