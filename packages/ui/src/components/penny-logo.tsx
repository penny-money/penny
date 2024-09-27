import { cn } from "@penny/ui/cn";
import { cva, VariantProps } from "class-variance-authority";

const pennyLogoVariants = cva(
  "font-semibold flex items-center justify-center text-secondary-foreground hover:text-foreground",
  {
    variants: {
      variant: {
        short: "size-16 text-3xl",
        long: "",
      },
    },
    defaultVariants: {
      variant: "short",
    },
  },
);

export interface PennyLogoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pennyLogoVariants> {}

export const PennyLogo: React.FC<PennyLogoProps> = ({
  className,
  variant = "short",
  ...props
}) => {
  return (
    <div {...props} className={cn(pennyLogoVariants({ variant }), className)}>
      {variant === "short" ? "p." : "penny."}
    </div>
  );
};
