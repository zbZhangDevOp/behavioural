export const CompaniesProperties = () => {
  const industryColor = (industry: string): string => {
    switch (industry) {
      case 'Technology':
        return 'bg-blue-500/20 text-blue-700';
      case 'Finance':
        return 'bg-green-500/20 text-green-700';
      case 'Healthcare':
        return 'bg-red-500/20 text-red-700';
      case 'Automotive':
        return 'bg-yellow-500/20 text-yellow-700';
      case 'E-commerce':
        return 'bg-purple-500/20 text-purple-700';
      case 'Energy':
        return 'bg-orange-500/20 text-orange-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400';
    }
  };

  return {
    industryColor,
  };
};
