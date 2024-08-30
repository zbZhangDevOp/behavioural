import QuestionPage from './question-page';

export const metadata = {
  title: 'Feed - Mosaic',
  description: 'Page description',
};

const SnippetPage = async ({
  params,
}: {
  params: {
    questionId: string;
  };
}) => {
  return (
    <div className='px-4 sm:px-6 lg:px-8 py-8 md:py-0 w-full max-w-[96rem] mx-auto'>
      <div className='xl:flex'>
        {/* Left + Middle content */}
        <div className='md:flex flex-1'>
          <QuestionPage questionId={params.questionId} />
        </div>
      </div>
    </div>
  );
};

export default SnippetPage;
