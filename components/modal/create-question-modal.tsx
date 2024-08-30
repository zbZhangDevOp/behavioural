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

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const BehaviouralQuestionSchema = z.object({
  questionText: z
    .string()
    .min(1, { message: 'Question text must not be empty.' }),
  confidenceLevel: z.number().min(0).max(10).nullable(),
});

interface CreateBehaviouralQuestionModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function CreateBehaviouralQuestionModal({
  isOpen,
  setIsOpen,
}: CreateBehaviouralQuestionModalProps) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof BehaviouralQuestionSchema>>({
    resolver: zodResolver(BehaviouralQuestionSchema),
    defaultValues: {
      questionText: '',
      confidenceLevel: null,
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof BehaviouralQuestionSchema>
  ) => {
    console.log(data);

    try {
      const userResponse = await supabase.auth.getUser();
      const user = userResponse.data.user;

      if (!user || !user.id) {
        throw new Error('User not logged in or ID is undefined');
      }

      const { error } = await supabase.from('behavioural_question').insert([
        {
          question_text: data.questionText,
          confidence_level: data.confidenceLevel,
          user_id: user.id,
        },
      ]);

      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Error adding behavioural question:', error.message);

      toast.error('Failed to add a new question.');
      return null;
    }

    toast.success('Question added successfully');

    router.refresh();

    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <ModalBasic
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title='Add Behavioural Question'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <div className=''>
            <div className='space-y-3'>
              <FormField
                control={form.control}
                name='questionText'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium mb-1'>
                      Question Text
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Question Text'
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
                name='confidenceLevel'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium mb-1'>
                      Confidence Level (0-10)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Confidence Level'
                        value={field.value !== null ? field.value : ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
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
