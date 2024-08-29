'use client';

import React, { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Footer from '@/components/landing-page/ui/footer';
import Header from '@/components/landing-page/ui/header';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  return (
    <>
      <Header />

      <main className='grow'>{children}</main>

      <Footer border={true} />
    </>
  );
}
