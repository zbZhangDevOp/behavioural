'use client';

import React, { useEffect, useState } from 'react';

import FeedLeftContent from './feed-left-content';

import { JSONContent } from 'novel';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/database.types';

import Editor from '@/components/editor/advanced-editor';
import toast from 'react-hot-toast';
import { defaultValue } from '@/lib/default-value';

export default function NotePage({ jobId }: { jobId: string }) {
  const [noteTabs, setNoteTabs] = useState<
    Database['public']['Tables']['interview_section'][]
  >([]);

  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchNotes();
  }, []);

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

      // Initialize the noteTabs with the fetched data
      setNoteTabs(
        data.map((tab) => ({
          ...tab,
          notes: tab.notes || defaultValue, // Ensure each tab has a default value for notes
        }))
      );

      console.log('Fetched jobs:', data);
    } catch (error: any) {
      console.error('Error fetching notes', error.message);

      return null;
    }
  };

  const onSave = async (tabId: string, value: JSONContent | null) => {
    try {
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
        .eq('id', tabId);

      if (error) {
        throw error;
      }

      console.log(`Saved successfully for tab ${tabId}`);
      toast.success(`Saved successfully for tab ${tabId}`);
    } catch (error: any) {
      console.error(`Error saving notes for tab ${tabId}`, error.message);
      toast.error(`Error saving notes for tab ${tabId}`);
      return null;
    }
  };

  return (
    <>
      {/* Left content */}
      <FeedLeftContent jobId={jobId} notes={noteTabs} />
      <div className='px-4 sm:px-6 lg:px-8 py-8 w-full'>
        {/* Page content */}
        <div className='mx-auto flex flex-col gap-1 lg:space-x-8 xl:space-x-16 w-full'>
          {/* Content */}
          {noteTabs.map((tab) => (
            <div key={tab.id} id={`section-${tab.id}`} className='!ml-0'>
              {/* Profile background */}
              <div className='mb-6 flex justify-between items-center'>
                <h2 className='text-2xl text-gray-800 dark:text-gray-100 font-bold text-center'>
                  {tab.name}
                </h2>
                <button
                  className='btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white'
                  onClick={() => onSave(tab.id, tab.notes)}
                >
                  Save
                </button>
              </div>

              <Editor
                initialValue={tab.notes}
                onChange={(newValue) => {
                  setNoteTabs((prevTabs) =>
                    prevTabs.map((prevTab) =>
                      prevTab.id === tab.id
                        ? { ...prevTab, notes: newValue }
                        : prevTab
                    )
                  );
                }}
                key={tab.id}
              />
              <hr className='my-6 border-t border-gray-100 dark:border-gray-700/60' />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
