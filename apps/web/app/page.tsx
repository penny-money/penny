import { Button } from "@penny/ui/components/ui/button";
import { Landmark } from "@penny/ui/icons/index";
import Link from "next/link";
import BrainCircuit from "../components/icons/brain-circuit";
import { Feature } from "../components/feature";
import Goal from "../components/icons/goal";
import { JoinListForm } from "../components/join-list-form";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-secondary text-secondary-foreground p-2 flex items-center justify-between sticky top-0">
        <Link href="/" className="px-2">
          <p className="font-bold text-xl">penny.</p>
        </Link>
        <Button variant="secondary">Join the waitlist</Button>
      </nav>
      <main className="grow">
        <section className="h-80 flex flex-col gap-5 items-center justify-center text-center px-8">
          <header className="space-y-3">
            <h1 className="text-2xl font-bold">
              Simplify Your Finances, Amplify Your Freedom
            </h1>
            <p className="text-sm text-secondary-foreground">
              The Open-Source Personal Finance Platform That Puts You in Control
            </p>
          </header>
          <JoinListForm />
        </section>
        <section className="bg-secondary text-secondary-foreground flex flex-col items-center gap-4 p-8">
          <header className="w-full max-w-4xl text-xs font-bold">
            <h2>Empower Your Finances with Penny's Core Features</h2>
          </header>
          <ul className="grid grid-cols-1 md:grid-cols-2 place-content-center gap-6">
            <Feature
              icon={<Landmark />}
              smallTitle="Multiple Accounts"
              largeTitle="Unified Dashboard"
              description="
                Say goodbye to juggling multiple apps and websites. Penny's
                Unified Dashboard brings all your financial accounts together in
                one sleek, easy-to-navigate interface. Get a comprehensive view
                of your entire financial picture at a glance, making it simpler
                than ever to stay on top of your money.
              "
            />
            <Feature
              icon={<BrainCircuit />}
              smallTitle="AI Powered Budgeting"
              largeTitle="Smart Budgeting"
              description="
                Take the guesswork out of budgeting with Penny's AI-powered
                insights. Our Smart Budgeting feature analyzes your spending
                patterns and financial goals to provide personalized
                recommendations. Effortlessly create and stick to budgets that
                work for your unique lifestyle and aspirations.
              "
            />
            <Feature
              icon={<Goal />}
              smallTitle="Goal Tracking"
              largeTitle="Track Your Goals"
              description="Turn your financial dreams into reality with Penny's Goal Tracking feature. Easily set, visualize, and track progress towards your financial objectives, whether it's saving for a home, planning a vacation, or building your retirement nest egg. Watch your goals come to life as Penny helps you stay motivated and on track."
            />
          </ul>
        </section>
      </main>
      <footer className="flex flex-col items-center justify-center py-32 relative overflow-hidden">
        <JoinListForm />
        <p className="md:text-9xl text-8xl font-bold absolute -bottom-6 text-accent">
          penny.
        </p>
      </footer>
    </div>
  );
}
