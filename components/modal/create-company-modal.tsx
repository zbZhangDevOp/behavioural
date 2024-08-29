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
import { Input } from '../ui/input';

const CompanySchema = z.object({
  companyName: z
    .string()
    .min(1, { message: 'Company name must not be empty.' }),
  companyWebsite: z.string().url().optional().nullable(),
});

interface CreateCompanyModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function CreateCompanyModal({
  isOpen,
  setIsOpen,
}: CreateCompanyModalProps) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const form = useForm<z.infer<typeof CompanySchema>>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      companyName: '',
      companyWebsite: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof CompanySchema>) => {
    // Handle form submission logic here, such as sending data to an API
    console.log(data);

    try {
      const userResponse = await supabase.auth.getUser();
      const user = userResponse.data.user;

      if (!user || !user.id) {
        throw new Error('User not logged in or ID is undefined');
      }

      const { error } = await supabase.from('company').insert([
        {
          company_name: data.companyName,
          company_website: data.companyWebsite,
          user_id: user.id,
        },
      ]);

      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Error fetching collections:', error.message);

      toast.error('Failed to add a new company.');
      return null;
    }

    toast.success('Company added successfully');

    router.refresh();

    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <ModalBasic isOpen={isOpen} setIsOpen={setIsOpen} title='Add Company'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          <div className=''>
            <div className='space-y-3'>
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
                name='companyWebsite'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium mb-1'>
                      Company Website (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='url'
                        placeholder='Company Website'
                        {...field}
                        value={field.value || ''} // Convert null to empty string
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
