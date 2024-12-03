'use client';

import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Columns3 } from 'lucide-react';
import { useState } from 'react';
import {
  type AccountColumnsID,
  accountColumnIdToHeaderTextMap,
} from '../columns/accounts';
import { DataTable } from '../data-table';

interface AccountDataTableProps<D, V> {
  columns: ColumnDef<D, V>[];
  data: D[];
}

const useAccountsTable = <D, V>({
  columns,
  data,
}: AccountDataTableProps<D, V>) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    currency: false,
    isActive: false,
    type: false,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'isActive', value: true },
  ]);

  return useReactTable({
    columns,
    data,
    state: {
      columnFilters,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
  });
};

export function AccountsTable<D, V>({
  columns,
  data,
}: AccountDataTableProps<D, V>) {
  const table = useAccountsTable({ columns, data });

  return (
    <div className="space-y-4">
      <div className="w-full">
        <div className="ml-auto w-min">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <span className="sr-only">Columns</span>
                <Columns3 />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={table.getIsAllColumnsVisible()}
                onCheckedChange={() => table.toggleAllColumnsVisible()}
                disabled={table.getIsAllColumnsVisible()}
              >
                Show all columns
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter(({ getCanHide }) => getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(checked) =>
                      column.toggleVisibility(!!checked)
                    }
                  >
                    {
                      accountColumnIdToHeaderTextMap[
                        column.id as AccountColumnsID
                      ]
                    }
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <DataTable columns={columns} table={table} />
    </div>
  );
}
