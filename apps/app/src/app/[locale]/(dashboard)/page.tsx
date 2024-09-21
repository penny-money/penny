import { SignOut } from "@/components/sign-out";
import { getI18n } from "@/locales/server";
import { getUser } from "@penny/supabase/queries";

export const metadata = {
  title: "Home",
};

export default async function Page() {
  const { data } = await getUser();
  const t = await getI18n();

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <p>{t("welcome", { name: data?.user?.email })}</p>
      <SignOut />
    </div>
  );
}
