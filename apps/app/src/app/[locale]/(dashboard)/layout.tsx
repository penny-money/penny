import { Navbar } from "@/components/dashboard/navbar";
import { cn } from "@penny/ui/cn";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="@container/screen h-screen w-screen flex">
      <Navbar />
      <main
        className={cn(
          "@container/main",
          "h-screen grow flex flex-col divide-y",
        )}
      >
        <div className="@container/topbar h-16 flex items-center justify-end shrink-0 p-4"></div>
        <div className="grow">{children}</div>
      </main>
    </div>
  );
}
