// import {
//   Dialog,
//   DialogPanel,
//   Transition,
//   TransitionChild,
// } from '@headlessui/react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
// import { set } from 'date-fns';
import React from 'react';

interface ModalBasicProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function ModalBasic({
  children,
  title,
  isOpen,
  setIsOpen,
}: ModalBasicProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-auto max-w-lg w-full max-h-full'>
        {/* Modal header */}
        <DialogTitle className='font-semibold text-gray-800 dark:text-gray-100'>
          {title}
        </DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
