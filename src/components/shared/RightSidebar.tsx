export default function RightSidebar() {
  return (
    <section className="sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-neutral-800 bg-black px-10 pb-6 pt-28 max-xl:hidden">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-white text-lg font-semibold">Suggested Communities</h3>
        <div className="mt-7 flex w-[350px] flex-col gap-9 items-center justify-center h-full text-neutral-500">
          No communities yet
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-white text-lg font-semibold">Suggested Users</h3>
        <div className="mt-7 flex w-[350px] flex-col gap-9 items-center justify-center h-full text-neutral-500">
          No users recommended
        </div>
      </div>
    </section>
  );
}
