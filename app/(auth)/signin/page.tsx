'use client';

// export const metadata = {
//   title: 'Sign In',
//   description: 'Page description',
// };

import AuthHeader from '../auth-header';
import AuthImage from '../auth-image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';
import { Provider } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

export default function SignIn() {
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleSignup = async (
    e: any,
    options: {
      type: string;
      provider?: Provider;
    }
  ) => {
    e?.preventDefault();

    setIsLoading(true);

    try {
      const { type, provider } = options;
      const redirectURL = window.location.origin + '/api/auth/callback';

      if (type === 'oauth') {
        await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: redirectURL,
          },
        });
      } else if (type === 'magic_link') {
        await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: redirectURL,
          },
        });

        toast.success('Check your emails!');

        setIsDisabled(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='bg-white dark:bg-gray-900'>
      <div className='relative md:flex'>
        {/* Content */}
        <div className='md:w-1/2'>
          <div className='min-h-[100dvh] h-full flex flex-col after:flex-1'>
            <AuthHeader />

            <div className='max-w-sm mx-auto w-full px-4 py-8'>
              <h1 className='text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6'>
                Welcome back!
              </h1>

              {/* Form */}
              <form onSubmit={(e) => handleSignup(e, { type: 'magic_link' })}>
                <div className='space-y-4'>
                  <div>
                    <label
                      className='block text-sm font-medium mb-1'
                      htmlFor='email'
                    >
                      Email Address
                    </label>
                    <input
                      id='email'
                      className='form-input w-full'
                      type='email'
                      autoComplete='email'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className='flex items-center justify-between mt-6 w-full'>
                  <button
                    className='btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white w-full disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-white dark:disabled:bg-gray-800 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed'
                    disabled={isLoading || isDisabled}
                    type='submit'
                  >
                    {isLoading && (
                      <span className='loading loading-spinner loading-xs'></span>
                    )}
                    Send Magic Link
                  </button>
                </div>
              </form>
              {/* Footer */}
              <div className='pt-5 mt-6 border-t border-gray-100 dark:border-gray-700/60'>
                <button
                  className='btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300 flex gap-1 w-full disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-white dark:disabled:bg-gray-800 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed'
                  onClick={(e) =>
                    handleSignup(e, { type: 'oauth', provider: 'google' })
                  }
                  disabled={isLoading || isDisabled}
                >
                  {isLoading ? (
                    <span className='loading loading-spinner loading-xs'></span>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-6 h-6'
                      viewBox='0 0 48 48'
                    >
                      <path
                        fill='#FFC107'
                        d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z'
                      />
                      <path
                        fill='#FF3D00'
                        d='m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z'
                      />
                      <path
                        fill='#4CAF50'
                        d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z'
                      />
                      <path
                        fill='#1976D2'
                        d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z'
                      />
                    </svg>
                  )}
                  Sign-up with Google
                </button>
                {/* Warning */}
                {/* <div className='mt-5'>
                  <div className='bg-yellow-500/20 text-yellow-700 px-3 py-2 rounded-lg'>
                    <svg
                      className='inline w-3 h-3 shrink-0 fill-current mr-2'
                      viewBox='0 0 12 12'
                    >
                      <path d='M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z' />
                    </svg>
                    <span className='text-sm'>
                      To support you during the pandemic super pro features are
                      free until March 31st.
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <AuthImage />
      </div>
    </main>
  );
}
