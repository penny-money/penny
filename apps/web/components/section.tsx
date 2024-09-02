import { cn } from "@penny/ui/lib/utils";

interface SectionProps {
  className?: string;
}

const Section: React.FC<React.PropsWithChildren<SectionProps>> = ({
  children,
  className,
}) => {
  return <section className={cn("w-screen", className)}>{children}</section>;
};

export default Section;
