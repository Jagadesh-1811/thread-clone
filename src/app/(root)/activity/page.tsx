import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";

export default async function ActivityPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  interface Activity {
    _id: string;
    parentId: string;
  }

  // Placeholder for activity items
  const activity: Activity[] = [];

  return (
    <section>
      <h1 className="text-left text-3xl font-bold text-white mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          activity.map((item) => (
            <Link key={item._id} href={`/thread/${item.parentId}`}>
              <article className="activity-card bg-neutral-900 p-4 rounded-lg flex items-center gap-2 text-white border border-neutral-800 hover:bg-neutral-800 transition-colors">
                 {/* Activity content will go here */}
              </article>
            </Link>
          ))
        ) : (
          <p className="!text-base-regular text-neutral-500">No activity yet</p>
        )}
      </section>
    </section>
  );
}
