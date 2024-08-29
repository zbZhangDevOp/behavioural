'use client';

// export const metadata = {
//   title: 'Jobs - Mosaic',
//   description: 'Page description',
// };

import { SelectedItemsProvider } from '@/app/selected-items-context';
import SearchForm from '@/components/search-form';
import DeleteButton from '@/components/delete-button';
import FilterButton from '@/components/dropdown-filter';
import PaginationClassic from '@/components/pagination-classic';
import CreateJobModal from '@/components/modal/create-job-modal';
import { useEffect, useState } from 'react';
import DateSelect from '@/components/date-select';
import { DataTable } from './data-table';
import { columns } from './columns';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/database.types';

function JobsContent() {
  const [jobs, setJobs] = useState<Database['public']['Tables']['job'][]>([]);

  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const userResponse = await supabase.auth.getUser();
      const user = userResponse.data.user;

      if (!user || !user.id) {
        throw new Error('User not logged in or ID is undefined');
      }
      const { data, error } = await supabase
        .from('job')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      setJobs(data);

      console.log('Fetched jobs:', data);
    } catch (error: any) {
      console.error('Error fetching jobs:', error.message);

      return null;
    }
  };

  const [applicationStatus, setApplicationStatus] = useState('pending');

  const [createJobModalIsOpen, setCreateJobModalIsOpen] = useState(false);

  return (
    <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto'>
      {/* Page header */}
      <div className='sm:flex sm:justify-between sm:items-center mb-5'>
        {/* Left: Title */}
        <div className='mb-4 sm:mb-0'>
          <h1 className='text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold'>
            Jobs
          </h1>
        </div>

        {/* Right: Actions */}
        <div className='grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2'>
          {/* Search form */}
          <SearchForm placeholder='Search by job title or company…' />
          {/* Create job button */}
          <button
            className='btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white'
            onClick={() => {
              setCreateJobModalIsOpen(true);
            }}
          >
            <svg
              className='fill-current shrink-0 xs:hidden'
              width='16'
              height='16'
              viewBox='0 0 16 16'
            >
              <path d='M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z' />
            </svg>
            <span className='max-xs:sr-only'>Add Job</span>
          </button>
          <CreateJobModal
            isOpen={createJobModalIsOpen}
            setIsOpen={setCreateJobModalIsOpen}
          />
        </div>
      </div>

      {/* More actions */}
      <div className='sm:flex sm:justify-between sm:items-center mb-5'>
        {/* Left side */}
        <div className='mb-4 sm:mb-0'>
          <ul className='flex flex-wrap -m-1'>
            <li className='m-1'>
              <button className='inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800 transition'>
                All{' '}
                <span className='ml-1 text-gray-400 dark:text-gray-500'>
                  10
                </span>
              </button>
            </li>
            <li className='m-1'>
              <button className='inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition'>
                Applied{' '}
                <span className='ml-1 text-gray-400 dark:text-gray-500'>4</span>
              </button>
            </li>
            <li className='m-1'>
              <button className='inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition'>
                Interview Scheduled{' '}
                <span className='ml-1 text-gray-400 dark:text-gray-500'>2</span>
              </button>
            </li>
            <li className='m-1'>
              <button className='inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 transition'>
                Offer Received{' '}
                <span className='ml-1 text-gray-400 dark:text-gray-500'>1</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Right side */}
        <div className='grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2'>
          {/* Delete button */}
          <DeleteButton />
          {/* Dropdown */}
          <DateSelect
            selectedValue={applicationStatus}
            setSelectedValue={setApplicationStatus}
            placeholder='Select application status'
          />
          {/* Filter button */}
          <FilterButton align='right' />
        </div>
      </div>

      {/* Table */}
      {/* <JobsTable jobs={jobs} /> */}

      <DataTable columns={columns} data={jobs} />

      {/* Pagination */}
      <div className='mt-8'>
        <PaginationClassic />
      </div>
    </div>
  );
}

export default function Jobs() {
  return (
    <SelectedItemsProvider>
      <JobsContent />
    </SelectedItemsProvider>
  );
}
