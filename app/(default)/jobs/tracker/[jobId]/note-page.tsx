'use client';

import React, { useEffect, useState } from 'react';

import FeedLeftContent from './feed-left-content';

import { JSONContent } from 'novel';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/database.types';

import Editor from '@/components/editor/advanced-editor';
import { defaultValue } from '@/lib/default-value';
import toast from 'react-hot-toast';

export default function NotePage({ jobId }: { jobId: string }) {
  const [noteTabs, setNoteTabs] = useState<
    Database['public']['Tables']['interview_section'][]
  >([]);

  const [selectedTab, setSelectedTab] = useState<
    Database['public']['Tables']['interview_section'] | null
  >(null);

  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchNotes();
  }, []);

  const [value, setValue] = useState<JSONContent>({});

  useEffect(() => {
    if (selectedTab) {
      setValue(selectedTab.notes || {});
      console.log(value);
    }
  }, [selectedTab]);

  const fetchNotes = async () => {
    try {
      const userResponse = await supabase.auth.getUser();
      const user = userResponse.data.user;

      if (!user || !user.id) {
        throw new Error('User not logged in or ID is undefined');
      }
      const { data, error } = await supabase
        .from('interview_section')
        .select('*')
        .eq('job_id', jobId);

      if (error) {
        throw error;
      }

      setNoteTabs(data);

      console.log('Fetched jobs:', data);
    } catch (error: any) {
      console.error('Error fetching notes', error.message);

      return null;
    }
  };

  const onSave = async () => {
    try {
      if (!selectedTab) {
        throw new Error('Cannot edit company info in current page');
      }

      const userResponse = await supabase.auth.getUser();
      const user = userResponse.data.user;

      if (!user || !user.id) {
        throw new Error('User not logged in or ID is undefined');
      }

      const { error } = await supabase
        .from('interview_section')
        .update({
          notes: value,
        })
        .eq('id', selectedTab?.id);

      if (error) {
        throw error;
      }

      console.log('Saved successfully');
      toast.success('Saved successfully');
    } catch (error: any) {
      console.error('Error saving notes', error.message);
      toast.error('Error saving notes');
      return null;
    }
  };

  return (
    <>
      {/* Left content */}
      <FeedLeftContent
        jobId={jobId}
        notes={noteTabs}
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />
      <div className='px-4 sm:px-6 lg:px-8 py-8 w-full'>
        {/* Page content */}
        <div className='mx-auto flex flex-col lg:space-x-8 xl:space-x-16 w-full'>
          {/* Content */}
          <div>
            {/* Profile background */}
            <div className='mb-6 flex justify-between items-center'>
              <h2 className='text-2xl text-gray-800 dark:text-gray-100 font-bold text-center'>
                {selectedTab ? selectedTab.name : 'Company Info'}
              </h2>
              {selectedTab && (
                <button
                  className='btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white'
                  onClick={onSave}
                >
                  Save
                </button>
              )}
            </div>
            <Editor
              initialValue={value}
              onChange={setValue}
              key={selectedTab ? selectedTab.id : 'editor'}
            />
            <hr className='my-6 border-t border-gray-100 dark:border-gray-700/60' />
          </div>
        </div>
      </div>
    </>
  );
}
