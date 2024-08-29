'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import ModalBasic from '../modal-basic';
import { Input } from '../ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { set } from 'date-fns';

const NoteSchema = z.object({
  interviewSectionName: z
    .string()
    .min(1, { message: 'Section name must not be empty.' }),
  sectionType: z.enum(['note', 'interview']).optional(), // Adjust according to your enum in the database
});

interface CreateNoteModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  jobId: string;
}

export default function CreateNoteModal({
  isOpen,
  setIsOpen,
  jobId,
}: CreateNoteModalProps) {
  const supabase = createClientComponentClient();

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      interviewSectionName: '',
      sectionType: 'note',
    },
  });

  const handleSubmit = async (data: z.infer<typeof NoteSchema>) => {
    setIsSubmitting(true);
    try {
      const userResponse = await supabase.auth.getUser();
      const user = userResponse.data.user;

      if (!user || !user.id) {
        throw new Error('User not logged in or ID is undefined');
      }

      const { error } = await supabase.from('interview_section').insert([
        {
          job_id: jobId,
          name: data.interviewSectionName,
          section_type: data.sectionType,
          notes: undefined,
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success('Job and interview section added successfully');
      router.refresh();
      setIsOpen(false);
    } catch (error: any) {
      console.error('Error adding job or interview section:', error.message);
      toast.error('Failed to add a new job and interview section.');
    }
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <ModalBasic
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title='Add Job and Interview'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <div className='space-y-3'>
            <FormField
              control={form.control}
              name='interviewSectionName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='block text-sm font-medium mb-1'>
                    Interview Section Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Interview Section Name'
                      {...field}
                      className='form-input w-full px-2 py-1'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sectionType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='block text-sm font-medium mb-1'>
                    Section Type
                  </FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className='btn justify-between min-w-[11rem] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100'>
                        <SelectValue placeholder='Select section type' />
                      </SelectTrigger>
                      <SelectContent className='bg-white dark:bg-gray-800'>
                        <SelectItem value='note'>Note</SelectItem>
                        <SelectItem value='interview'>Interview</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex justify-end space-x-2 mt-5'>
            <Button
              className='btn-sm border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300'
              size={'sm'}
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              className='btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white'
              size={'sm'}
              type='submit'
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </ModalBasic>
  );
}
