import { Landmark } from "@penny/ui/icons/index";
import Hero from "../components/hero";
import NavBar from "../components/nav-bar";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center pt-0 md:pt-2 lg:pt-3">
      <NavBar />
      <main className="flex flex-col">
        <Hero />
        <section className="flex flex-col p-8">
          <header>
            <h2>Empower Your Finances With Penny's Core Features</h2>
          </header>
          <ul>
            <li className="border bg-primary-foreground flex flex-col">
              <header className="flex items-center">
                <div className="p-2 w-10 h-10">
                  <Landmark />
                </div>
                <h3>Multiple Accounts</h3>
              </header>
              <h4>Unified Dashboard</h4>
              <p>
                Say goodbye to juggling multiple apps and websites. Penny's
                Unified Dashboard brings all your financial accounts together in
                one sleek, easy-to-navigate interface. Get a comprehensive view
                of your entire financial picture at a glance, making it simpler
                than ever to stay on top of your money.
              </p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
