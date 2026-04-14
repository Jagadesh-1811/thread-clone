import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  const user = await fetchUser(session.user.id);
  if (!user) return null;

  const userData = {
    id: user.id,
    objectId: user._id.toString(),
    username: user.username,
    name: user.name,
    bio: user.bio || "",
    image: user.image || session.user.image || "",
  };

  return (
    <>
      <h1 className="text-left text-heading2-bold text-white mb-10 text-3xl font-bold">Edit Profile</h1>
      <p className="mt-3 text-base-regular text-neutral-400">Make changes to your profile information.</p>

      <section className="mt-12 bg-neutral-900 p-10 rounded-xl border border-neutral-800">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </>
  );
}
