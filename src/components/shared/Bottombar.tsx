"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "./LeftSidebar";
import { cn } from "@/lib/utils";

export default function Bottombar() {
  const pathname = usePathname();

  return (
    <section className="fixed bottom-0 z-10 w-full bg-black p-4 backdrop-blur-lg xs:px-7 md:hidden border-t border-neutral-800">
      <div className="flex items-center justify-between gap-3 xs:gap-5">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "relative flex flex-col items-center gap-2 rounded-lg p-2 transition-colors sm:flex-1 sm:px-2 sm:py-2.5",
                isActive ? "bg-primary text-black" : "text-white"
              )}
            >
              <div className="w-6 h-6">{link.imgURL}</div>
              <p className="text-[10px] sm:hidden text-center">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
