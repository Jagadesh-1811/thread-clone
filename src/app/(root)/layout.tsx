import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";

export default function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Topbar />
      <main className="flex flex-row">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col items-center bg-black px-6 pb-10 pt-28 max-md:pb-32 sm:px-10 overflow-y-auto">
          <div className="w-full max-w-4xl text-white">
            {children}
          </div>
        </section>
        <RightSidebar />
      </main>
      <Bottombar />
    </>
  );
}
