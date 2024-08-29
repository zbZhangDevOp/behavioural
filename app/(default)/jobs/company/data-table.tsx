'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div className='bg-white dark:bg-gray-800 shadow-sm rounded-xl relative'>
      <header className='px-5 py-4'>
        <h2 className='font-semibold text-gray-800 dark:text-gray-100'>
          Companies{' '}
          <span className='text-gray-400 dark:text-gray-500 font-medium'>
            {data.length}
          </span>
        </h2>
      </header>
      <div className='overflow-x-auto'>
        <Table className='table-auto w-full dark:text-gray-300'>
          <TableHeader className='text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-gray-100 dark:border-gray-700/60'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='border-b border-gray-100 dark:border-gray-700/60'
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className='px-2 first:pl-5 last:pr-5 py-0 whitespace-nowrap font-semibold'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='text-sm divide-y divide-gray-100 dark:divide-gray-700/60'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700/60'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className='px-2 first:pl-5 last:pr-5 py-4 whitespace-nowrap'
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center text-gray-500 dark:text-gray-400'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
