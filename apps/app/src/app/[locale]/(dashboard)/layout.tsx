import { NavbarLink } from "@/components/navbar/navbar-link";
import { getI18n } from "@/locales/server";
import { getUser } from "@penny/supabase/queries";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUser();
  const t = await getI18n();

  return (
    <div className="h-screen w-screen grid grid-cols-12">
      <nav className="col-span-2 h-full text-secondary-foreground border-r text-sm">
        <ul className="divide-y">
          <li className="p-2">
            <p className="text-sm">
              {t("welcome", { name: data?.user?.email })}
            </p>
          </li>
          <li className="p-2">
            <ul className="divide-y">
              <NavbarLink href="./accounts" name="Accounts" />
            </ul>
          </li>
        </ul>
      </nav>
      <main className="col-span-10 h-full">{children}</main>
    </div>
  );
}
