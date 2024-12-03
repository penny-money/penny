'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { accountSchema } from '@/actions/schema';
import { Badge } from '@repo/design-system/components/ui/badge';
import { cn } from '@repo/design-system/lib/utils';
import { formatDistance, formatRelative } from 'date-fns';

export const accountColumns: ColumnDef<typeof accountSchema._type>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Account Name',
  },
  {
    id: 'accountNumber',
    accessorKey: 'accountNumber',
    header: 'Account Number',
    cell: ({ row }) => {
      const accountNumber = row.getValue('accountNumber') as string;

      return <div>{accountNumber.slice(-4).padStart(12, '*')}</div>;
    },
  },
  {
    id: 'currency',
    accessorKey: 'currency',
    header: 'Currency',
  },
  {
    id: 'balance',
    accessorKey: 'balance',
    header: () => <div className="text-right">Balance</div>,
    cell: ({ row }) => {
      const balance = Number.parseFloat(row.getValue('balance'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: row.getValue('currency'),
      }).format(balance);

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    id: 'isActive',
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean;

      return (
        <Badge
          variant={isActive ? 'positive' : 'destructive'}
          className={cn('w-20 justify-center rounded-none')}
        >
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: 'Account Type',
  },
  {
    id: 'updatedAt',
    accessorKey: 'updatedAt',
    header: 'Last Updated',
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt') as Date;

      return (
        <div>{formatDistance(updatedAt, new Date(), { addSuffix: true })}</div>
      );
    },
  },
];
