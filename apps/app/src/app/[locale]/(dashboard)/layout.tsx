import { getI18n } from "@/locales/server";
import { WalletCards } from "@penny/ui/icons";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getI18n();

  return (
    <div className="h-screen w-screen flex">
      <aside className="flex-shrink-0 px-4 border-r bg-secondary">
        <ul className="flex flex-col gap-2 mt-2 space-y-4">
          <li>
            <Link
              href="/"
              className="text-3xl font-semibold size-10 flex items-center justify-center"
            >
              p.
            </Link>
          </li>
          <li>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    className="hover:bg-accent hover:border size-10 flex items-center justify-center"
                    href="./accounts"
                  >
                    <WalletCards className="size-6" />
                  </Link>
                </li>
              </ul>
            </nav>
          </li>
        </ul>
      </aside>
      <main className="col-span-10 h-full">{children}</main>
    </div>
  );
}
