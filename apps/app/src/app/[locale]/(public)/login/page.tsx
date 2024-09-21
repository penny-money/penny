import { GoogleSignin } from "@/components/google-signin";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <main className="w-screen h-screen relative py-4 px-8 flex items-center justify-center">
      <p className="text-3xl absolute top-4 left-8 font-semibold">penny.</p>
      <div className="flex flex-col gap-6 grow max-w-md">
        <h1 className="text-4xl font-semibold">Login to penny.</h1>
        <p className="text-2xl text-muted-foreground">
          Take control of your finances, stay organized and have a fulfilling
          life.
        </p>
        <GoogleSignin />
      </div>
    </main>
  );
}
