'use client';

import CreateNoteModal from '@/components/modal/create-note-modal';
import { Button } from '@/components/ui/button';
import { Database } from '@/database.types';
import {
  Building2,
  Compass,
  Home,
  Notebook,
  Plus,
  Terminal,
  Video,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { use, useEffect, useState } from 'react';

interface FeedLeftContentProps {
  jobId: string;
  notes: Database['public']['Tables']['interview_section'][];

  // react usestate function for    const [selectedTab, setSelectedTab] = useState<Database['public']['Tables']['interview_section'] | null>(null);
  setSelectedTab: (
    selectedTab: Database['public']['Tables']['interview_section'] | null
  ) => void;

  selectedTab: Database['public']['Tables']['interview_section'] | null;
}

export default function FeedLeftContent({
  jobId,
  notes,
  setSelectedTab,
  selectedTab,
}: FeedLeftContentProps) {
  const pathname = usePathname(); // Get the current pathname

  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    {
      name: 'Company',
      route: `/jobs/tracker/${jobId}`,
      icon: (
        <Home
          className='text-violet-500 mr-2'
          width='16'
          height='16'
          strokeWidth={3}
        />
      ),
      active: pathname === `/jobs/tracker/${jobId}`,
    },
  ];

  // const handleTabClick = (route) => {
  //   router.push(route); // Navigate to the selected route
  // };

  return (
    <div className='w-full md:w-[15rem] mb-8 md:mb-0'>
      <div className='md:sticky md:top-16 md:h-[calc(100dvh-64px)] md:overflow-x-hidden md:overflow-y-auto no-scrollbar'>
        <div className='md:py-8'>
          {/* Title */}
          <header className='mb-6'>
            <h1 className='text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold'>
              Job
            </h1>
          </header>

          {/* Search form */}
          {/* <div className='xl:hidden mb-6'>
            <form className='relative'>
              <label htmlFor='feed-search-mobile' className='sr-only'>
                Search
              </label>
              <input
                id='feed-search-mobile'
                className='form-input w-full pl-9 bg-white dark:bg-gray-800'
                type='search'
                placeholder='Search…'
              />
              <button
                className='absolute inset-0 right-auto group'
                type='submit'
                aria-label='Search'
              >
                <svg
                  className='shrink-0 fill-current text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 ml-3 mr-2'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z' />
                  <path d='M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z' />
                </svg>
              </button>
            </form>
          </div> */}

          {/* Links */}
          <div className='flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-4 md:space-y-3 -mx-4'>
            {/* Group 1 */}
            <div>
              <div className='text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-3 md:sr-only'>
                Add a new note
              </div>
              <ul className='flex flex-nowrap md:block mr-3 md:mr-0'>
                <li className='mr-0.5 md:mr-0 md:mb-0.5'>
                  <Button
                    className={`flex items-center justify-start px-2.5 py-2 rounded-lg whitespace-nowrap active:bg-white  active:dark:bg-gray-800 w-full`}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Plus
                      className='text-violet-500 mr-2'
                      width='16'
                      height='16'
                      strokeWidth={3}
                    />
                    <span
                      className={`text-sm font-medium active:text-violet-500 text-gray-600 dark:text-gray-300`}
                    >
                      Add Note
                    </span>
                  </Button>
                  <CreateNoteModal
                    jobId={jobId}
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                  />
                </li>

                {/* <a
                  className='flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap'
                  href='#0'
                ></a> */}
              </ul>
            </div>
            <div>
              <div className='text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-3 md:sr-only'>
                Company Info
              </div>
              <ul className='flex flex-nowrap md:block mr-3 md:mr-0'>
                <li className='mr-0.5 md:mr-0 md:mb-0.5'>
                  <Button
                    className={`flex items-center justify-start px-2.5 py-2 rounded-lg whitespace-nowrap active:bg-white  active:dark:bg-gray-800 w-full ${
                      selectedTab === null ? 'bg-white dark:bg-gray-800' : ''
                    }`}
                    onClick={() => setSelectedTab(null)}
                  >
                    <Home
                      className='text-violet-500 mr-2'
                      width='16'
                      height='16'
                      strokeWidth={3}
                    />
                    <span
                      className={`text-sm font-medium active:text-violet-500 text-gray-600 dark:text-gray-300 ${
                        selectedTab === null
                          ? 'text-violet-500'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      Company
                    </span>
                  </Button>
                  <CreateNoteModal
                    jobId={jobId}
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                  />
                </li>
              </ul>
            </div>
            {/* Group 2 */}
            <div>
              <div className='text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-3'>
                Notes
              </div>
              <ul className='flex flex-nowrap md:block mr-3 md:mr-0'>
                {notes.map((tab) => (
                  <li key={tab.id} className='mr-0.5 md:mr-0 md:mb-0.5'>
                    <Button
                      className={`flex items-center justify-start px-2.5 py-2 rounded-lg whitespace-nowrap ${
                        selectedTab && selectedTab.id === tab.id
                          ? 'bg-white dark:bg-gray-800'
                          : ''
                      } active:bg-white  active:dark:bg-gray-800 w-full`}
                      onClick={() => setSelectedTab(tab)}
                    >
                      <Notebook
                        className='text-violet-500 mr-2'
                        width='16'
                        height='16'
                        strokeWidth={3}
                      />
                      <span
                        className={`text-sm font-medium ${
                          selectedTab && selectedTab.id === tab.id
                            ? 'text-violet-500'
                            : 'text-gray-600 dark:text-gray-300'
                        } active:text-violet-500`}
                      >
                        {tab.name}
                      </span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
