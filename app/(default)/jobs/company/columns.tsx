'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  website: string;
  notes: string;
}

export const columns: ColumnDef<Company>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className='flex items-center'>
        <label className='inline-flex'>
          <span className='sr-only'>Select</span>
          <input
            className='form-checkbox'
            type='checkbox'
            checked={table.getIsAllPageRowsSelected()}
            onChange={() =>
              table.toggleAllPageRowsSelected(!table.getIsAllPageRowsSelected())
            }
            aria-label='Select all'
          />
        </label>
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex items-center'>
        <label className='inline-flex'>
          <span className='sr-only'>Select</span>
          <input
            className='form-checkbox'
            type='checkbox'
            checked={row.getIsSelected()}
            onChange={() => row.toggleSelected(!row.getIsSelected())}
            aria-label='Select row'
          />
        </label>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const company = row.original;

      return (
        <Link href={`/jobs/company/${company.id}`}>
          <div className='font-medium text-sky-600'>{row.getValue('name')}</div>
        </Link>
      );
    },
  },
  {
    accessorKey: 'industry',
    header: 'Industry',
    cell: ({ row }) => {
      return (
        <div className='font-medium text-gray-800 dark:text-gray-100'>
          {row.getValue('industry')}
        </div>
      );
    },
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => {
      return (
        <div className='font-medium text-gray-800 dark:text-gray-100'>
          {row.getValue('location')}
        </div>
      );
    },
  },
  {
    accessorKey: 'website',
    header: 'Website',
    cell: ({ row }) => {
      return (
        <div className='text-blue-500 hover:underline'>
          {row.getValue('website')}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='bg-white'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
            //   onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
