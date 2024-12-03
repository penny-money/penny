'use client';

import { deleteAccountAction } from '@/actions/accounts';
import type { accountSchema } from '@/actions/schema';
import { Badge } from '@repo/design-system/components/ui/badge';
import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { cn } from '@repo/design-system/lib/utils';
import { handleError } from '@repo/design-system/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDistance } from 'date-fns';
import { Loader, MoreHorizontal } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { type MouseEventHandler, useState } from 'react';

export const accountColumnIdToHeaderTextMap = {
  name: 'Account name',
  accountNumber: 'Account Number',
  currency: 'Currency',
  balance: 'Balance',
  isActive: 'Status',
  type: 'Account Type',
  updatedAt: 'Last Update',
  actions: 'Actions',
};

// biome-ignore lint/style/useNamingConvention: <Consecutive ID is okay>
export type AccountColumnsID = keyof typeof accountColumnIdToHeaderTextMap;

export const accountColumns: ColumnDef<typeof accountSchema._type>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Account Name',
  },
  {
    id: 'accountNumber',
    accessorKey: 'accountNumber',
    header: accountColumnIdToHeaderTextMap.accountNumber,
    cell: ({ row }) => {
      const accountNumber = row.getValue('accountNumber') as string;

      return <div>{accountNumber.slice(-4).padStart(12, '*')}</div>;
    },
  },
  {
    id: 'currency',
    accessorKey: 'currency',
    header: accountColumnIdToHeaderTextMap.currency,
  },
  {
    id: 'balance',
    accessorKey: 'balance',
    header: () => (
      <div className="text-right">{accountColumnIdToHeaderTextMap.balance}</div>
    ),
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
    header: accountColumnIdToHeaderTextMap.isActive,
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
    header: accountColumnIdToHeaderTextMap.type,
  },
  {
    id: 'updatedAt',
    accessorKey: 'updatedAt',
    header: accountColumnIdToHeaderTextMap.updatedAt,
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt') as Date;

      return (
        <div>{formatDistance(updatedAt, new Date(), { addSuffix: true })}</div>
      );
    },
  },
  {
    id: 'actions',
    header: accountColumnIdToHeaderTextMap.actions,
    enableHiding: false,
    cell: ({ row }) => {
      const account = row.original;
      const [open, setOpen] = useState(false);

      const deleteAccount = useAction(deleteAccountAction);
      const handleDeleteAccount: MouseEventHandler<HTMLDivElement> = async (
        e
      ) => {
        e.preventDefault(); // prevents dropdown-menu from closing before path is reloaded
        try {
          await deleteAccount.executeAsync({ id: account.id });
        } catch {
          handleError('Error deleting account');
        }
      };

      return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-none">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="justify-center bg-destructive text-destructive-foreground focus:bg-destructive/80 focus:text-destructive-foreground"
              onClick={handleDeleteAccount}
            >
              {deleteAccount.isPending ? (
                <>
                  <span className="sr-only">Deleting account</span>
                  <Loader className="animate-spin" />
                </>
              ) : (
                'Delete account'
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
