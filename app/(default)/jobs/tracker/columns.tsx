'use client';

import { ColumnDef } from '@tanstack/react-table';

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Database } from '@/database.types';
import { statusColor } from './jobs-properties';

export const columns: ColumnDef<Database['public']['Tables']['job']>[] = [
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
    accessorKey: 'job_title',
    header: 'Title',
    cell: ({ row }) => {
      const job = row.original;

      return (
        // @ts-ignore
        <Link href={`/jobs/tracker/${job.id}`}>
          <div className='font-medium text-sky-600'>
            {row.getValue('job_title')}
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: 'company_name',
    header: 'Company',
    cell: ({ row }) => {
      return (
        <div className='font-medium text-gray-800 dark:text-gray-100'>
          {row.getValue('company_name')}
        </div>
      );
    },
  },
  {
    accessorKey: 'application_status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div
          className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(
            row.getValue('application_status')
          )}`}
        >
          {row.getValue('application_status')}
        </div>
      );
    },
  },

  {
    accessorKey: 'application_date',
    header: 'Applied On',
    cell: ({ row }) => {
      return (
        <div className='font-medium text-gray-800 dark:text-gray-100'>
          {row.getValue('application_date')}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // const payment = row.original;

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
            <DropdownMenuItem>Copy payment ID</DropdownMenuItem>
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
