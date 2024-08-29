export const metadata = {
  title: 'Company - Mosaic',
  description: 'Page description',
};

import Image from 'next/image';
import CompanyBg from '@/public/images/company-bg.jpg';
import CompanyImage from '@/public/images/company-icon-01.svg';

export default function Jobs() {
  // Some dummy jobs data

  return (
    <>
      {/* Profile background */}
      <div className='h-56 bg-gray-200 dark:bg-gray-900'>
        <Image
          className='object-cover h-full w-full'
          src={CompanyBg}
          width={2560}
          height={440}
          alt='Company background'
        />
      </div>

      {/* Header */}
      <header className='text-center bg-white/30 dark:bg-gray-800/30 pb-6 border-b border-gray-200 dark:border-gray-700/60'>
        <div className='px-4 sm:px-6 lg:px-8 w-full'>
          <div className='max-w-3xl mx-auto'>
            {/* Avatar */}
            <div className='-mt-12 mb-2'>
              <div className='inline-flex -ml-1 -mt-1 sm:mb-0'>
                <Image
                  className='rounded-full border-4 border-white dark:border-gray-900'
                  src={CompanyImage}
                  width={104}
                  height={104}
                  alt='Avatar'
                />
              </div>
            </div>

            {/* Company name and info */}
            <div className='mb-4'>
              <h2 className='text-2xl text-gray-800 dark:text-gray-100 font-bold mb-2'>
                Revolut Ltd
              </h2>
            </div>

            {/* Meta */}
            <div className='inline-flex flex-wrap justify-center sm:justify-start space-x-4'>
              <div className='flex items-center'>
                <svg
                  className='fill-current shrink-0 text-gray-400 dark:text-gray-500'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                >
                  <path d='M8 8.992a2 2 0 1 1-.002-3.998A2 2 0 0 1 8 8.992Zm-.7 6.694c-.1-.1-4.2-3.696-4.2-3.796C1.7 10.69 1 8.892 1 6.994 1 3.097 4.1 0 8 0s7 3.097 7 6.994c0 1.898-.7 3.697-2.1 4.996-.1.1-4.1 3.696-4.2 3.796-.4.3-1 .3-1.4-.1Zm-2.7-4.995L8 13.688l3.4-2.997c1-1 1.6-2.198 1.6-3.597 0-2.798-2.2-4.996-5-4.996S3 4.196 3 6.994c0 1.399.6 2.698 1.6 3.697 0-.1 0-.1 0 0Z' />
                </svg>
                <span className='text-sm font-medium whitespace-nowrap text-gray-500 dark:text-gray-400 ml-2'>
                  London, UK
                </span>
              </div>
              <div className='flex items-center'>
                <svg
                  className='fill-current shrink-0 text-gray-400 dark:text-gray-500'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                >
                  <path d='M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z' />
                </svg>
                <a
                  className='text-sm font-medium whitespace-nowrap text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 ml-2'
                  href='#0'
                >
                  revolut.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Page content */}
      <div className='px-4 sm:px-6 lg:px-8 py-8 w-full'>
        <div className='max-w-3xl mx-auto'>
          {/* The Role */}
          <div>
            <h2 className='text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-2'>
              The Role
            </h2>
            <div className='space-y-6'>
              <p>
                In the world of AI, behavioural predictions are leading the
                charge to better machine learning.
              </p>
              <p>
                There is so much happening in the AI space. Advances in the
                economic sectors have seen automated business practices rapidly
                increasing economic value. While the realm of the human sciences
                has used the power afforded by computational capabilities to
                solve many human based dilemmas. Even the art scene has adopted
                carefully selected ML applications to usher in the technological
                movement.
              </p>
              <p>
                Join us every second Wednesday as we host an open discussion
                about the amazing things happening in the world of AI and
                machine learning. Feel free to share your experiences, ask
                questions, ponder the possibilities, or just listen as we
                explore new topics and revisit old ones.
              </p>
            </div>
          </div>

          <hr className='my-6 border-t border-gray-100 dark:border-gray-700/60' />

          {/* About You */}
          <div>
            <h2 className='text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-2'>
              About You
            </h2>
            <div className='space-y-6'>
              <p>
                You love building great software. Your work could be supporting
                new feature development, migrating existing features, and
                creating other mobile and web solutions for customers. You'll
                have a primary focus on frontend development using Javascript.
                Our client's tech stack is JavaScript, primarily using React. A
                strong understanding of JS core (ES2019+) is required, with some
                exposure in Java as back-end technology. We use modern tools,
                which means you'll have the opportunity to work with Webpack,
                Redux, Apollo, Styled Components, and much more.
              </p>
              <p>
                You love learning. Engineering is an ever-evolving world. You
                enjoy playing with new tech and exploring areas that you might
                not have experience with yet. You are self-driven, self-learner
                willing to share knowledge and participate actively in your
                community.
              </p>
              <p>
                Having overlap with your team is critical when working in a
                global remote team. Modus requires all team members to overlap
                with EST morning hours daily. In addition, reliable high speed
                internet is a must.
              </p>
            </div>
          </div>

          <hr className='my-6 border-t border-gray-100 dark:border-gray-700/60' />

          {/* Things You Might Do */}
          <div>
            <h2 className='text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-2'>
              Things You Might Do
            </h2>
            <div className='space-y-6'>
              <p>
                We are a fast-growing, and remote-first company, so you'll
                likely get experience on many different projects across the
                organization. That said, here are some things you'll probably
                do:
              </p>
              <ul className='list-disc list-inside space-y-1'>
                <li>
                  Give back to the community via open source and blog posts
                </li>
                <li>
                  Travel and meet great people- as part of our remote-first
                  lifestyle, it's important that we come together as needed to
                  work together, meet each other in person and have fun
                  together. Please keep that in mind when you apply.
                </li>
                <li>
                  Teach and be taught: Modus creates active teams that work in
                  internal and external projects together, giving opportunities
                  to stay relevant with the latest technologies and learning
                  from experts worldwide
                </li>
                <li>
                  Interact directly with internal and external clients to
                  represent Modus and its values
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
