import { formatAmount } from '@/utils/money';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { type VariantProps, cn, cva } from '@repo/design-system/lib/utils';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { FC, HTMLAttributes } from 'react';

const accountSummaryCardVariants = cva(
  'rounded-none shadow-none h-full justify-between flex flex-col',
  {
    variants: {
      variant: {
        primary: ' bg-neutral-600 text-neutral-50',
        secondary: 'bg-neutral-50 text-neutral-600 border border-neutral-300',
      },
    },
    defaultVariants: {
      variant: 'secondary',
    },
  }
);

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
  const amountDifference = props.currentAmount - (props.previousAmount ?? 0);
  const isPositive = amountDifference > 0;

  return (
    <Card
      className={cn(accountSummaryCardVariants({ variant: props.variant }), '')}
    >
      <CardHeader className="p-4">
        <CardTitle className="font-normal text-sm">{props.title}</CardTitle>
        <CardDescription className="sr-only">
          {props.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-px">
          <div className="font-bold text-xl">
            {formatAmount(props.currentAmount, props.currency)}
          </div>
          <div className={cn('flex gap-1 text-ellipsis text-sm')}>
            {isPositive ? (
              <ArrowUpRight className="size-4" />
            ) : (
              <ArrowDownRight className="size-4" />
            )}
            {formatAmount(props.previousAmount ?? 0, props.currency)} last
            period
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
