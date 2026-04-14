import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";
import ThreadCard from "@/components/cards/ThreadCard";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const user = await fetchUser(session.user.id);
  if (!user) {
    // If the user doesn't exist in our DB yet but has a session,
    // we might need to handle this (e.g., sync first). 
    // Assuming registration flow handles user creation.
    return <div>User not found. Please try logging in again.</div>;
  }

  const userPosts = await fetchUserPosts(session.user.id);

  return (
    <section>
      <h1 className="text-left text-3xl font-bold text-white mb-10">Profile</h1>

      <div className="flex items-center justify-between bg-neutral-900 p-6 rounded-xl border border-neutral-800">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={user.image || "/assets/profile.svg"}
              alt="profile photo"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-2xl font-semibold text-white">
              {user.name}
            </h2>
            <p className="text-neutral-500">@{user.username.toLowerCase().replace(/\s+/g, "")}</p>
          </div>
        </div>

        <Link href="/profile/edit">
          <div className="flex cursor-pointer gap-3 rounded-lg bg-neutral-800 px-4 py-2 hover:bg-neutral-700 transition-colors">
            <Image
              src="/assets/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
            <p className="text-neutral-200 text-sm font-medium">Edit</p>
          </div>
        </Link>
      </div>

      <p className="mt-6 max-w-lg text-neutral-200">{user.bio || "No bio available"}</p>

      <div className="mt-12 w-full border-t border-neutral-800 pt-9">
        <h3 className="text-white text-xl font-bold mb-5">Your Threads</h3>
        
        <div className="flex flex-col gap-10">
          {userPosts?.threads?.length > 0 ? (
            userPosts.threads.map((thread: { _id: string; text: string; community: any; createdAt: string; children: any }) => (
              <ThreadCard
                key={thread._id}
                id={thread._id}
                content={thread.text}
                author={{
                  name: user.name,
                  image: user.image,
                  id: user.id,
                }}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
              />
            ))
          ) : (
            <p className="text-neutral-500">No threads created yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
