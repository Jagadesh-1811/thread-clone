import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function SearchPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return (
    <section>
      <h1 className="text-left text-3xl font-bold text-white mb-10">Search</h1>

      <div className="relative mt-5">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
        <Input 
          type="text" 
          placeholder="Search communities" 
          className="bg-neutral-900 border-neutral-800 text-white pl-10 h-12 focus:border-white transition-all ring-0 focus-visible:ring-0"
        />
      </div>

      <div className="mt-14 flex flex-col gap-9">
        <p className="text-center text-neutral-500">No users found</p>
      </div>
    </section>
  );
}
