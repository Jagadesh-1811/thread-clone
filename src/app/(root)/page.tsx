import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { fetchPosts } from "@/lib/actions/thread.actions";
import ThreadCard from "@/components/cards/ThreadCard";

export default async function Home() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const result = await fetchPosts(1, 30);

  return (
    <>
      <h1 className="text-left text-heading2-bold text-white mb-10 text-3xl font-bold">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result text-neutral-500 text-center py-20">No threads found. Be the first to post!</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
