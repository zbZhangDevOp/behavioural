export const metadata = {
  title: 'Company - Mosaic',
  description: 'Page description',
};

import CompanyInfo from './company-info';

export default function IndividualCompanyPage({
  params,
}: {
  params: {
    companyId: string;
  };
}) {
  return (
    <>
      <CompanyInfo companyId={params.companyId} />

      {/* Page content */}
    </>
  );
}
