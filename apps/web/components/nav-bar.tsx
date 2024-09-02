import { Button } from "@penny/ui/components/ui/button";

const NavBar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between bg-secondary w-full max-w-lg md:max-w-xl lg:max-w-2xl pl-8 py-2 border">
      <p className="text-xl font-bold">penny.</p>
      <Button variant="secondary">Join the waitlist</Button>
    </nav>
  );
};

export default NavBar;
