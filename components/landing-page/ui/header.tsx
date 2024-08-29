'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import Logo from './logo';
import MobileMenu from './mobile-menu';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [top, setTop] = useState<boolean>(true);

  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient();

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();
  }, [supabase]);

  return (
    <header className='fixed top-2 z-30 w-full md:top-6'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <div className='relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]'>
          {/* Site branding */}
          <div className='flex flex-1 items-center'>
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className='hidden md:flex md:grow'>
            {/* Desktop menu links */}
            <ul className='flex grow flex-wrap items-center justify-center gap-4 text-sm lg:gap-8'>
              <li className='px-3 py-1'>
                <Link
                  href='/pricing'
                  className='flex items-center text-gray-700 transition hover:text-gray-900'
                >
                  Pricing
                </Link>
              </li>
              <li className='px-3 py-1'>
                <Link
                  href='/customers'
                  className='flex items-center text-gray-700 transition hover:text-gray-900'
                >
                  Customers
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop sign in links */}
          {/* <ul className='flex flex-1 items-center justify-end gap-3'>
            <li>
              <Link
                href='/signin'
                className='btn-sm bg-gray-800 text-gray-200 shadow'
              >
                Login
              </Link>
            </li>
          </ul> */}

          <ul className='flex flex-1 items-center justify-end gap-3'>
            {user ? (
              <li>
                <Button
                  asChild
                  size='sm'
                  // className='h-8'
                  className='btn-sm bg-gray-800 text-gray-200 shadow'
                >
                  <Link href='/dashboard' className='flex justify-center gap-2'>
                    Dashboard
                  </Link>
                </Button>
              </li>
            ) : (
              <li>
                <Button
                  asChild
                  size='sm'
                  // className='h-8'
                  className='btn-sm bg-gray-800 text-gray-200 shadow'
                >
                  <Link href='/signin'>Login</Link>
                </Button>
              </li>
            )}
          </ul>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
