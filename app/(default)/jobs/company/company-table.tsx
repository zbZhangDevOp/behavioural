'use client';

import { useItemSelection } from '@/components/utils/use-item-selection';
import CompaniesTableItem from './company-table-item';

export interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  website: string;
  notes: string;
}

export default function CompaniesTable({
  companies,
}: {
  companies: Company[];
}) {
  const {
    selectedItems,
    isAllSelected,
    handleCheckboxChange,
    handleSelectAllChange,
  } = useItemSelection(companies);

  return (
    <div className='bg-white dark:bg-gray-800 shadow-sm rounded-xl relative'>
      <header className='px-5 py-4'>
        <h2 className='font-semibold text-gray-800 dark:text-gray-100'>
          Companies{' '}
          <span className='text-gray-400 dark:text-gray-500 font-medium'>
            {companies.length}
          </span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='table-auto w-full dark:text-gray-300'>
            {/* Table header */}
            <thead className='text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60'>
              <tr>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px'>
                  <div className='flex items-center'>
                    <label className='inline-flex'>
                      <span className='sr-only'>Select all</span>
                      <input
                        className='form-checkbox'
                        type='checkbox'
                        onChange={handleSelectAllChange}
                        checked={isAllSelected}
                      />
                    </label>
                  </div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Company Name</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Industry</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Location</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Website</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Notes</div>
                </th>
                <th className='px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap'>
                  <div className='font-semibold text-left'>Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className='text-sm divide-y divide-gray-100 dark:divide-gray-700/60'>
              {companies.map((company) => (
                <CompaniesTableItem
                  key={company.id}
                  company={company}
                  onCheckboxChange={handleCheckboxChange}
                  isSelected={selectedItems.includes(company.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
