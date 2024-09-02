import { Input } from "@penny/ui/components/ui/input";
import Section from "./section";
import { Button } from "@penny/ui/components/ui/button";

const Hero: React.FC = () => {
  return (
    <Section className="py-12 flex flex-col items-center justify-center gap-8 h-96">
      <header className="flex flex-col items-center text-center gap-3 w-full max-w-[36ch] md:max-w-[72ch]">
        <h1 className="text-2xl font-bold">
          Simplify Your Finances, Amplify Your Freedom
        </h1>
        <p className="text-base text-secondary-foreground">
          The Open-Source Personal Finance Platform That Puts You in Control
        </p>
      </header>
      <form
        id="hero-form"
        className="flex flex-col sm:flex-row gap-3 w-full max-w-xs md:max-w-md"
      >
        <Input placeholder="email@yako.com" />
        <Button type="submit">Join the waitlist</Button>
      </form>
    </Section>
  );
};

export default Hero;
