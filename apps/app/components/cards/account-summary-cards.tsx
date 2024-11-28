import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { cn, cva, type VariantProps } from '@repo/design-system/lib/utils';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { FC, HTMLAttributes } from 'react';

const accountSummaryCardVariants = cva('rounded-none shadow-none flex-auto', {
  variants: {
    variant: {
      primary: 'basis-1/3 bg-neutral-600 text-neutral-50',
      secondary: 'bg-neutral-50 text-neutral-600 border border-neutral-300',
    },
  },
  defaultVariants: {
    variant: 'secondary',
  },
});

interface AccountSummaryCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accountSummaryCardVariants> {
  title: string;
  description: string;
  currency: string;
  currentAmount: number;
  previousAmount: number | undefined;
}

export const AccountSummaryCard: FC<AccountSummaryCardProps> = (props) => {
  return (
    <Card
      className={cn(accountSummaryCardVariants({ variant: props.variant }), '')}
    >
      <CardHeader>
        <CardTitle className="font-normal text-sm">{props.title}</CardTitle>
        <CardDescription className="sr-only">
          {props.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5">
          <div className="flex gap-2 font-bold font-mono text-4xl">
            <span>{props.currency}</span>
            <span>{props.currentAmount}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {props.currentAmount - (props.previousAmount ?? 0) > 0 ? (
              <ArrowUpRight className="size-5" />
            ) : (
              <ArrowDownRight className="size-5" />
            )}
            <span>vs</span>
            <span className="font-bold font-mono">{props.currency}</span>
            <span className="font-bold font-mono">{props.previousAmount}</span>
            <span>last period</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
