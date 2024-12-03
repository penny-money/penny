import { formatAmount } from '@/utils/money';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { cn } from '@repo/design-system/lib/utils';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { FC } from 'react';

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
        <CardTitle className="">{props.name}</CardTitle>
        <CardDescription>
          <span className="sr-only">{props.description}</span>
          <div className="text-muted-foreground">
            {`${props.institution} • ${props.accountNumber
              .slice(-4)
              .padStart(props.accountNumber.length, '*')}`}
          </div>
          <div className="flex items-center gap-1 text-sm">
            <div
              className="size-3"
              style={{ backgroundColor: props.labelColor }}
            />
            <div className="text-neutral-500">{props.category}</div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0">
        <div className="">
          <div className="font-semibold text-lg text-neutral-600">
            {formatAmount(props.currentAmount, props.currency)}
          </div>

          <div
            className={cn(
              'flex items-center gap-1 truncate text-nowrap text-sm',
              isPositive ? 'text-green-600' : 'text-red-600'
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="size-4" />
            ) : (
              <ArrowDownRight className="size-4" />
            )}
            {formatAmount(props.previousAmount, props.currency)} last period
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
