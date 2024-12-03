'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { accountSchema } from '@/actions/schema';
import { Badge } from '@repo/design-system/components/ui/badge';
import { cn } from '@repo/design-system/lib/utils';
import { formatDistance } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { Button } from '@repo/design-system/components/ui/button';
import { Loader, MoreHorizontal } from 'lucide-react';
import { deleteAccountAction } from '@/actions/accounts';
import { useAction } from 'next-safe-action/hooks';
import { handleError } from '@repo/design-system/lib/utils';
import { type MouseEventHandler, useState } from 'react';

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
    header: 'Last Update',
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt') as Date;

      return (
        <div>{formatDistance(updatedAt, new Date(), { addSuffix: true })}</div>
      );
    },
  },
  {
    id: 'actions',
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
