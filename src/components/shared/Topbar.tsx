import Link from "next/link";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Topbar() {
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-black px-6 py-3 border-b border-neutral-800">
      <Link href="/" className="flex items-center gap-4">
        <p className="text-heading3-bold text-white max-xs:hidden text-2xl font-bold">Threads Clone</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant="ghost" size="icon" className="text-white hover:bg-neutral-900">
              <LogOut size={20} />
            </Button>
          </form>
        </div>
      </div>
    </nav>
  );
}
