import { Button } from "@penny/ui/button";
import { cn } from "@penny/ui/cn";
import { Settings } from "@penny/ui/icons";
import { PennyLogo } from "@penny/ui/penny-logo";
import { NavbarMiddlePart } from "./navbar-middle-part";

export const Navbar: React.FC = () => {
  return (
    <aside
      className={cn(
        "@container/sidebar flex flex-col justify-between",
        "w-16 shrink-0",
        "border-r bg-secondary",
        "divide-y",
      )}
    >
      <NavbarTopPart />
      <div className="grow">
        <NavbarMiddlePart />
      </div>
      <NavbarBottomPart />
    </aside>
  );
};

const NavbarTopPart: React.FC = () => {
  return (
    <Button size="sidebar" variant="ghost">
      <PennyLogo />
    </Button>
  );
};

const NavbarBottomPart: React.FC = () => {
  return (
    <Button size="sidebar" variant="ghost">
      <Settings />
    </Button>
  );
};
