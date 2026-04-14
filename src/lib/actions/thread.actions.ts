"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string,
  author: string,
  path: string,
}

export async function createThread({ text, author, path }: Params) {
  try {
    await connectToDB();

    // Find the user by their string id to get the MongoDB _id
    const user = await User.findOne({ id: author });

    const createdThread = await Thread.create({
      text,
      author: user._id, 
      community: null, 
    });

    // Update User model
    await User.findByIdAndUpdate(user._id, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (error: unknown) {
    throw new Error(`Failed to create thread: ${(error as Error).message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  await connectToDB();

  // Calculate the number of posts to skip based on the page number and page size.
  const skipAmount = (pageNumber - 1) * pageSize;

  // Create a query to fetch the posts that have no parent (top-level threads)
  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({
      path: "author",
      model: User,
    })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  // Count the total number of top-level posts (threads) i.e., threads that are not comments.
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}
