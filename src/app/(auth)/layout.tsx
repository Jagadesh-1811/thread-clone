export const metadata = {
  title: "Authentication | Threads Clone",
  description: "Sign in or sign up to Threads",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center mesh-gradient auth-bg text-white selection:bg-white/20">
      <div className="fixed inset-0 bg-[url('/assets/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20" />
      <div className="relative z-10 w-full flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
