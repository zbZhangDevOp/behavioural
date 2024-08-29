export const statusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'bg-blue-500/20 text-blue-700';
    case 'in-progress':
      return 'bg-yellow-500/20 text-yellow-700';
    case 'completed':
      return 'bg-green-500/20 text-green-700';
    case 'Interview Completed':
      return 'bg-purple-500/20 text-purple-700';
    case 'Rejected':
      return 'bg-red-500/20 text-red-700';
    default:
      return 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400';
  }
};
