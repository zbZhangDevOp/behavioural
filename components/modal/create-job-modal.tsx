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

const JobFeedbackSchema = z.object({
  jobTitle: z.string().min(1, { message: 'Job title must not be empty.' }),
  companyName: z
    .string()
    .min(1, { message: 'Company name must not be empty.' }),
  applicationStatus: z.enum(['pending', 'in-progress', 'completed']),
  applicationDate: z.string().optional(),
});

interface CreateJobModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function CreateJobModal({
  isOpen,
  setIsOpen,
}: CreateJobModalProps) {
  const supabase = createClientComponentClient();

  const router = useRouter();

  const form = useForm<z.infer<typeof JobFeedbackSchema>>({
    resolver: zodResolver(JobFeedbackSchema),
    defaultValues: {
      jobTitle: '',
      companyName: '',
      applicationStatus: 'pending',
      applicationDate: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof JobFeedbackSchema>) => {
    // Handle form submission logic here, such as sending data to an API
    console.log(data);

    try {
      const userResponse = await supabase.auth.getUser();
      const user = userResponse.data.user;

      if (!user || !user.id) {
        throw new Error('User not logged in or ID is undefined');
      }

      const { error } = await supabase.from('job').insert([
        {
          job_title: data.jobTitle,
          company_name: data.companyName,
          application_status: data.applicationStatus,
          application_date: data.applicationDate,
          user_id: user.id,
        },
      ]);

      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Error fetching collections:', error.message);

      toast.error('Failed to add a new job.');
      return null;
    }

    toast.success('Job added successfully');

    router.refresh();

    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <ModalBasic isOpen={isOpen} setIsOpen={setIsOpen} title='Send Feedback'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <div className=''>
            <div className='space-y-3'>
              <FormField
                control={form.control}
                name='jobTitle'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium mb-1'>
                      Job Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Job Title'
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
                name='companyName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium mb-1'>
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Company Name'
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
                name='applicationStatus'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium mb-1'>
                      Application Status
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          // @ts-ignore
                          form.setValue('applicationStatus', value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className='btn justify-between min-w-[11rem] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100'>
                          <SelectValue placeholder='Select status' />
                        </SelectTrigger>
                        <SelectContent className='bg-white dark:bg-gray-800'>
                          <SelectItem value='pending'>Pending</SelectItem>
                          <SelectItem value='in-progress'>
                            In Progress
                          </SelectItem>
                          <SelectItem value='completed'>Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='applicationDate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium mb-1'>
                      Applied On
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        {...field}
                        className='form-input w-full px-2 py-1'
                      />
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
              >
                Cancel
              </Button>
              <Button
                className='btn-sm bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white'
                size={'sm'}
                type='submit'
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </ModalBasic>
  );
}
