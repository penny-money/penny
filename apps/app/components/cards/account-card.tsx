import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { FC } from 'react';
import { cn } from '@repo/design-system/lib/utils';
import { formatAmount } from '@/utils/money';

interface AccountCardProps {
  name: string;
  description: string;
  institution: string;
  accountNumber: string;
  labelColor: string;
  category: string;
  currency: string;
  currentAmount: number;
  previousAmount: number;
}

export const AccountCard: FC<AccountCardProps> = (props) => {
  const amountDifference = props.currentAmount - (props.previousAmount ?? 0);
  const isPositive = amountDifference > 0;

  return (
    <Card className="rounded-none shadow-none">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center justify-between">
          <span>{props.name}</span>
        </CardTitle>
        <CardDescription>
          <span className="sr-only">{props.description}</span>
          <div className="mt-1 text-muted-foreground text-xs">
            {`${props.institution} • ${props.accountNumber
              .slice(-4)
              .padStart(props.accountNumber.length, '*')}`}
            {}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-xs">
            <div
              className="size-3"
              style={{ backgroundColor: props.labelColor }}
            />
            <div className="text-neutral-400">{props.category}</div>
          </div>
          <div className="font-bold font-mono text-neutral-600 text-xl">
            {formatAmount(props.currentAmount, props.currency)}
          </div>

          <div
            className={cn(
              'flex gap-1 truncate text-nowrap text-xs',
              isPositive ? 'text-green-600' : 'text-red-600'
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="size-4" />
            ) : (
              <ArrowDownRight className="size-4" />
            )}
            vs {formatAmount(props.previousAmount, props.currency)} last period
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
