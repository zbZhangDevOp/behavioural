'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectOption {
  id: string;
  label: string;
}

interface GenericSelectProps {
  options: SelectOption[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  placeholder?: string;
}

export default function GenericSelect({
  options,
  selectedValue,
  setSelectedValue,
  placeholder = 'Select an option',
}: GenericSelectProps) {
  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Select
    // className='relative inline-flex'
    // onClick={(e) => e.stopPropagation()}
    >
      <SelectTrigger
        className='btn justify-between min-w-[11rem] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100'
        aria-label={placeholder}
      >
        <span className='flex items-center'>
          <span>
            {options.find((option) => option.id === selectedValue)?.label ||
              placeholder}
          </span>
        </span>
      </SelectTrigger>
      <SelectContent className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-lg shadow-lg overflow-hidden mt-1'>
        {/* <MenuItems className='font-medium text-sm text-gray-600 dark:text-gray-300 focus:outline-none'> */}
        {options.map((option) => (
          <SelectItem key={option.id} value={option.label}>
            <button
              className={`flex items-center w-full cursor-pointer `}
              onClick={() => handleSelect(option.id)}
            >
              {/* <svg
                className={`shrink-0 mr-2 fill-current text-violet-500 ${
                  option.id !== selectedValue && 'invisible'
                }`}
                width='12'
                height='9'
              >
                <path d='M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z' />
              </svg> */}
              <span>{option.label}</span>
            </button>
          </SelectItem>
        ))}
        {/* </MenuItems> */}
      </SelectContent>
    </Select>
  );
}

// ${
//                 active ? 'bg-gray-50 dark:bg-gray-700/20' : ''
//               } ${option.id === selectedValue && 'text-violet-500'}
