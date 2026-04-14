"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, User, PlusSquare, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

export const sidebarLinks = [
  { imgURL: <Home />, route: "/", label: "Home" },
  { imgURL: <Search />, route: "/search", label: "Search" },
  { imgURL: <Heart />, route: "/activity", label: "Activity" },
  { imgURL: <PlusSquare />, route: "/create-thread", label: "Create Thread" },
  { imgURL: <User />, route: "/profile", label: "Profile" },
];

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-neutral-800 bg-black pb-5 pt-28 max-md:hidden">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "relative flex justify-start gap-4 rounded-lg p-4 transition-colors",
                isActive ? "bg-primary text-black" : "text-white hover:bg-neutral-900"
              )}
            >
              {link.imgURL}
              <p className="max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="px-6 pb-6">
        <button
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
          className="flex w-full cursor-pointer justify-start gap-4 rounded-lg p-4 text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white"
        >
          <LogOut />
          <p className="max-lg:hidden">Logout</p>
        </button>
      </div>
    </section>
  );
}
