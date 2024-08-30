'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Transition } from '@headlessui/react';
import { getBreakpoint } from '../utils/utils';
import SidebarLinkGroup from './sidebar-link-group';
import SidebarLink from './sidebar-link';
import Logo from './logo';
import { useAppProvider } from '@/providers/app-provider';

export default function Sidebar({
  variant = 'default',
}: {
  variant?: 'default' | 'v2';
}) {
  const sidebar = useRef<HTMLDivElement>(null);
  const { sidebarOpen, setSidebarOpen } = useAppProvider();
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);
  const segments = useSelectedLayoutSegments();
  const [breakpoint, setBreakpoint] = useState<string | undefined>(
    getBreakpoint()
  );
  const expandOnly =
    !sidebarExpanded && (breakpoint === 'lg' || breakpoint === 'xl');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!sidebar.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleBreakpoint = () => {
    setBreakpoint(getBreakpoint());
  };

  useEffect(() => {
    window.addEventListener('resize', handleBreakpoint);
    return () => {
      window.removeEventListener('resize', handleBreakpoint);
    };
  }, [breakpoint]);

  return (
    <div className={`min-w-fit ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
      {/* Sidebar backdrop (mobile only) */}
      <Transition
        as='div'
        className='fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto'
        show={sidebarOpen}
        enter='transition-opacity ease-out duration-200'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity ease-out duration-100'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        aria-hidden='true'
      />

      {/* Sidebar */}
      <Transition
        show={sidebarOpen}
        unmount={false}
        as='div'
        id='sidebar'
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${
          variant === 'v2'
            ? 'border-r border-gray-200 dark:border-gray-700/60'
            : 'rounded-r-2xl shadow-sm'
        }`}
        enterFrom='-translate-x-full'
        enterTo='translate-x-0'
        leaveFrom='translate-x-0'
        leaveTo='-translate-x-full'
      >
        {/* Sidebar header */}
        <div className='flex justify-between mb-10 pr-3 sm:px-2'>
          {/* Close button */}
          <button
            className='lg:hidden text-gray-500 hover:text-gray-400'
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls='sidebar'
            aria-expanded={sidebarOpen}
          >
            <span className='sr-only'>Close sidebar</span>
            <svg
              className='w-6 h-6 fill-current'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z' />
            </svg>
          </button>
          {/* Logo */}
          <Logo />
        </div>

        {/* Links */}
        <div className='space-y-8'>
          {/* Pages group */}
          <div>
            <h3 className='text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3'>
              <span
                className='hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6'
                aria-hidden='true'
              >
                •••
              </span>
              <span className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                Pages
              </span>
            </h3>
            <ul className='mt-3'>
              {/* Dashboard */}
              <SidebarLinkGroup open={segments.includes('dashboard')}>
                {(handleClick, open) => {
                  return (
                    <>
                      <a
                        href='#0'
                        className={`block text-gray-800 dark:text-gray-100 truncate transition ${
                          segments.includes('dashboard')
                            ? ''
                            : 'hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          expandOnly ? setSidebarExpanded(true) : handleClick();
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <svg
                              className={`shrink-0 fill-current ${
                                segments.includes('dashboard')
                                  ? 'text-violet-500'
                                  : 'text-gray-400 dark:text-gray-500'
                              }`}
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                            >
                              <path d='M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z' />
                              <path d='M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z' />
                            </svg>
                            <span className='text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Dashboard
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/dashboard'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Main
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/dashboard/analytics'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Analytics
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/dashboard/fintech'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Fintech
                              </span>
                            </SidebarLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* E-Commerce */}
              <SidebarLinkGroup open={segments.includes('jobs')}>
                {(handleClick, open) => {
                  return (
                    <>
                      <a
                        href='#0'
                        className={`block text-gray-800 dark:text-gray-100 truncate transition ${
                          segments.includes('jobs')
                            ? ''
                            : 'hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          expandOnly ? setSidebarExpanded(true) : handleClick();
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <svg
                              className={`shrink-0 fill-current ${
                                segments.includes('jobs')
                                  ? 'text-violet-500'
                                  : 'text-gray-400 dark:text-gray-500'
                              }`}
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                            >
                              <path d='M9 6.855A3.502 3.502 0 0 0 8 0a3.5 3.5 0 0 0-1 6.855v1.656L5.534 9.65a3.5 3.5 0 1 0 1.229 1.578L8 10.267l1.238.962a3.5 3.5 0 1 0 1.229-1.578L9 8.511V6.855ZM6.5 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm4.803 8.095c.005-.005.01-.01.013-.016l.012-.016a1.5 1.5 0 1 1-.025.032ZM3.5 11c.474 0 .897.22 1.171.563l.013.016.013.017A1.5 1.5 0 1 1 3.5 11Z' />
                            </svg>
                            <span className='text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Jobs
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/jobs/tracker'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Jobs Tracker
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/jobs/company'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Company
                              </span>
                            </SidebarLink>
                          </li>
                          {/* <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/jobs/orders'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Orders
                              </span>
                            </SidebarLink>
                          </li> */}

                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/jobs/calendar'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Calendar
                              </span>
                            </SidebarLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* E-Commerce */}
              <SidebarLinkGroup open={segments.includes('behaviour')}>
                {(handleClick, open) => {
                  return (
                    <>
                      <a
                        href='#0'
                        className={`block text-gray-800 dark:text-gray-100 truncate transition ${
                          segments.includes('behaviour')
                            ? ''
                            : 'hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          expandOnly ? setSidebarExpanded(true) : handleClick();
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <svg
                              className={`shrink-0 fill-current ${
                                segments.includes('behaviour')
                                  ? 'text-violet-500'
                                  : 'text-gray-400 dark:text-gray-500'
                              }`}
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                            >
                              <path d='M9 6.855A3.502 3.502 0 0 0 8 0a3.5 3.5 0 0 0-1 6.855v1.656L5.534 9.65a3.5 3.5 0 1 0 1.229 1.578L8 10.267l1.238.962a3.5 3.5 0 1 0 1.229-1.578L9 8.511V6.855ZM6.5 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm4.803 8.095c.005-.005.01-.01.013-.016l.012-.016a1.5 1.5 0 1 1-.025.032ZM3.5 11c.474 0 .897.22 1.171.563l.013.016.013.017A1.5 1.5 0 1 1 3.5 11Z' />
                            </svg>
                            <span className='text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Questions
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/behaviour/questions'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Question Bank
                              </span>
                            </SidebarLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* Tasks */}
              <SidebarLinkGroup open={segments.includes('tasks')}>
                {(handleClick, open) => {
                  return (
                    <>
                      <a
                        href='#0'
                        className={`block text-gray-800 dark:text-gray-100 truncate transition ${
                          segments.includes('tasks')
                            ? ''
                            : 'hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          expandOnly ? setSidebarExpanded(true) : handleClick();
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <svg
                              className={`shrink-0 fill-current ${
                                segments.includes('tasks')
                                  ? 'text-violet-500'
                                  : 'text-gray-400 dark:text-gray-500'
                              }`}
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                            >
                              <path d='M7.586 9H1a1 1 0 1 1 0-2h6.586L6.293 5.707a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 1 1-1.414-1.414L7.586 9ZM3.075 4.572a1 1 0 1 1-1.64-1.144 8 8 0 1 1 0 9.144 1 1 0 0 1 1.64-1.144 6 6 0 1 0 0-6.856Z' />
                            </svg>
                            <span className='text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Tasks
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/tasks/kanban'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Kanban
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/tasks/list'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                List
                              </span>
                            </SidebarLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              {/* Campaigns */}
              <li
                className={`pl-4 pr-3 py-2 rounded-lg mb-0.5 last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] ${
                  segments.includes('campaigns') &&
                  'from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]'
                }`}
              >
                <SidebarLink href='/campaigns'>
                  <div className='flex items-center'>
                    <svg
                      className={`shrink-0 fill-current ${
                        segments.includes('campaigns')
                          ? 'text-violet-500'
                          : 'text-gray-400 dark:text-gray-500'
                      }`}
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                    >
                      <path d='M6.649 1.018a1 1 0 0 1 .793 1.171L6.997 4.5h3.464l.517-2.689a1 1 0 1 1 1.964.378L12.498 4.5h2.422a1 1 0 0 1 0 2h-2.807l-.77 4h2.117a1 1 0 1 1 0 2h-2.501l-.517 2.689a1 1 0 1 1-1.964-.378l.444-2.311H5.46l-.517 2.689a1 1 0 1 1-1.964-.378l.444-2.311H1a1 1 0 1 1 0-2h2.807l.77-4H2.46a1 1 0 0 1 0-2h2.5l.518-2.689a1 1 0 0 1 1.17-.793ZM9.307 10.5l.77-4H6.612l-.77 4h3.464Z' />
                    </svg>
                    <span className='text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                      Campaigns
                    </span>
                  </div>
                </SidebarLink>
              </li>
              {/* Settings */}
              <SidebarLinkGroup open={segments.includes('settings')}>
                {(handleClick, open) => {
                  return (
                    <>
                      <a
                        href='#0'
                        className={`block text-gray-800 dark:text-gray-100 truncate transition ${
                          segments.includes('settings')
                            ? ''
                            : 'hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          expandOnly ? setSidebarExpanded(true) : handleClick();
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <svg
                              className={`shrink-0 fill-current ${
                                segments.includes('settings')
                                  ? 'text-violet-500'
                                  : 'text-gray-400 dark:text-gray-500'
                              }`}
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                            >
                              <path
                                d='M10.5 1a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2h-1.145a3.502 3.502 0 0 1-6.71 0H1a1 1 0 0 1 0-2h6.145A3.502 3.502 0 0 1 10.5 1ZM9 4.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM5.5 9a3.502 3.502 0 0 1 3.355 2.5H15a1 1 0 1 1 0 2H8.855a3.502 3.502 0 0 1-6.71 0H1a1 1 0 1 1 0-2h1.145A3.502 3.502 0 0 1 5.5 9ZM4 12.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z'
                                fillRule='evenodd'
                              />
                            </svg>
                            <span className='text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Settings
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/settings/account'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                My Account
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/settings/notifications'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                My Notifications
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/settings/apps'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Connected Apps
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/settings/plans'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Plans
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/settings/billing'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Billing & Invoices
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/settings/feedback'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Give Feedback
                              </span>
                            </SidebarLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* Utility */}
              <SidebarLinkGroup open={segments.includes('utility')}>
                {(handleClick, open) => {
                  return (
                    <>
                      <a
                        href='#0'
                        className={`block text-gray-800 dark:text-gray-100 truncate transition ${
                          segments.includes('utility')
                            ? ''
                            : 'hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          expandOnly ? setSidebarExpanded(true) : handleClick();
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <svg
                              className={`shrink-0 fill-current ${
                                segments.includes('utility')
                                  ? 'text-violet-500'
                                  : 'text-gray-400 dark:text-gray-500'
                              }`}
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                            >
                              <path d='M14.75 2.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM14.75 16a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM2.5 14.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM1.25 2.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z' />
                              <path d='M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2ZM4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z' />
                            </svg>
                            <span className='text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Utility
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/utility/changelog'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Changelog
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/utility/roadmap'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Roadmap
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/utility/faqs'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                FAQs
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/utility/empty-state'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Empty State
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/utility/404'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                404
                              </span>
                            </SidebarLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
          {/* More group */}
          <div>
            <h3 className='text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3'>
              <span
                className='hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6'
                aria-hidden='true'
              >
                •••
              </span>
              <span className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                More
              </span>
            </h3>
            <ul className='mt-3'>
              {/* Authentication */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <>
                      <a
                        href='#0'
                        className={`block text-gray-800 dark:text-gray-100 truncate transition ${
                          open
                            ? ''
                            : 'hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          expandOnly ? setSidebarExpanded(true) : handleClick();
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <svg
                              className={`shrink-0 fill-current text-gray-400 dark:text-gray-500`}
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                            >
                              <path d='M11.442 4.576a1 1 0 1 0-1.634-1.152L4.22 11.35 1.773 8.366A1 1 0 1 0 .227 9.634l3.281 4a1 1 0 0 0 1.59-.058l6.344-9ZM15.817 4.576a1 1 0 1 0-1.634-1.152l-5.609 7.957a1 1 0 0 0-1.347 1.453l.656.8a1 1 0 0 0 1.59-.058l6.344-9Z' />
                            </svg>
                            <span className='text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Authentication
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/signin'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Sign in
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/signup'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Sign up
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/reset-password'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Reset Password
                              </span>
                            </SidebarLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* Onboarding */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <>
                      <a
                        href='#0'
                        className={`block text-gray-800 dark:text-gray-100 truncate transition ${
                          open
                            ? ''
                            : 'hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          expandOnly ? setSidebarExpanded(true) : handleClick();
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <svg
                              className={`shrink-0 fill-current text-gray-400 dark:text-gray-500`}
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                            >
                              <path d='M6.668.714a1 1 0 0 1-.673 1.244 6.014 6.014 0 0 0-4.037 4.037 1 1 0 1 1-1.916-.571A8.014 8.014 0 0 1 5.425.041a1 1 0 0 1 1.243.673ZM7.71 4.709a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM9.995.04a1 1 0 1 0-.57 1.918 6.014 6.014 0 0 1 4.036 4.037 1 1 0 0 0 1.917-.571A8.014 8.014 0 0 0 9.995.041ZM14.705 8.75a1 1 0 0 1 .673 1.244 8.014 8.014 0 0 1-5.383 5.384 1 1 0 0 1-.57-1.917 6.014 6.014 0 0 0 4.036-4.037 1 1 0 0 1 1.244-.673ZM1.958 9.424a1 1 0 0 0-1.916.57 8.014 8.014 0 0 0 5.383 5.384 1 1 0 0 0 .57-1.917 6.014 6.014 0 0 1-4.037-4.037Z' />
                            </svg>
                            <span className='text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Onboarding
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/onboarding-01'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Step 1
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/onboarding-02'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Step 2
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/onboarding-03'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Step 3
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/onboarding-04'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Step 4
                              </span>
                            </SidebarLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>
              {/* Components */}
              <SidebarLinkGroup open={segments.includes('components-library')}>
                {(handleClick, open) => {
                  return (
                    <>
                      <a
                        href='#0'
                        className={`block text-gray-800 dark:text-gray-100 truncate transition ${
                          segments.includes('components-library')
                            ? ''
                            : 'hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          expandOnly ? setSidebarExpanded(true) : handleClick();
                        }}
                      >
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <svg
                              className={`shrink-0 fill-current ${
                                segments.includes('components-library')
                                  ? 'text-violet-500'
                                  : 'text-gray-400 dark:text-gray-500'
                              }`}
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                            >
                              <path d='M.06 10.003a1 1 0 0 1 1.948.455c-.019.08.01.152.078.19l5.83 3.333c.053.03.116.03.168 0l5.83-3.333a.163.163 0 0 0 .078-.188 1 1 0 0 1 1.947-.459 2.161 2.161 0 0 1-1.032 2.384l-5.83 3.331a2.168 2.168 0 0 1-2.154 0l-5.83-3.331a2.162 2.162 0 0 1-1.032-2.382Zm7.856-7.981-5.83 3.332a.17.17 0 0 0 0 .295l5.828 3.33c.054.031.118.031.17.002l5.83-3.333a.17.17 0 0 0 0-.294L8.085 2.023a.172.172 0 0 0-.17-.001ZM9.076.285l5.83 3.332c1.458.833 1.458 2.935 0 3.768l-5.83 3.333c-.667.38-1.485.38-2.153-.001l-5.83-3.332c-1.457-.833-1.457-2.935 0-3.767L6.925.285a2.173 2.173 0 0 1 2.15 0Z' />
                            </svg>
                            <span className='text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                              Components
                            </span>
                          </div>
                          {/* Icon */}
                          <div className='flex shrink-0 ml-2'>
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-gray-400 dark:text-gray-500 ${
                                open && 'rotate-180'
                              }`}
                              viewBox='0 0 12 12'
                            >
                              <path d='M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z' />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className='lg:hidden lg:sidebar-expanded:block 2xl:block'>
                        <ul className={`pl-8 mt-1 ${!open && 'hidden'}`}>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/components-library/button'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Button
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/components-library/form'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Input Form
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/components-library/dropdown'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Dropdown
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/components-library/alert'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Alert & Banner
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/components-library/modal'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Modal
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/components-library/pagination'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Pagination
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/components-library/tabs'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Tabs
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/components-library/breadcrumb'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Breadcrumb
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/components-library/badge'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Badge
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/components-library/avatar'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Avatar
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/components-library/tooltip'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Tooltip
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/components-library/accordion'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Accordion
                              </span>
                            </SidebarLink>
                          </li>
                          <li className='mb-1 last:mb-0'>
                            <SidebarLink href='/components-library/icons'>
                              <span className='text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200'>
                                Icons
                              </span>
                            </SidebarLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className='pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto'>
          <div className='w-12 pl-4 pr-3 py-2'>
            <button
              className='text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400'
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className='sr-only'>Expand / collapse sidebar</span>
              <svg
                className='shrink-0 fill-current text-gray-400 dark:text-gray-500 sidebar-expanded:rotate-180'
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 16 16'
              >
                <path d='M15 16a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v14a1 1 0 0 1-1 1ZM8.586 7H1a1 1 0 1 0 0 2h7.586l-2.793 2.793a1 1 0 1 0 1.414 1.414l4.5-4.5A.997.997 0 0 0 12 8.01M11.924 7.617a.997.997 0 0 0-.217-.324l-4.5-4.5a1 1 0 0 0-1.414 1.414L8.586 7M12 7.99a.996.996 0 0 0-.076-.373Z' />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}
