import ComparePlans from '@/components/landing-page/compare-plans';
import CtaAlternative from '@/components/landing-page/cta-alternative';
import Faqs from '@/components/landing-page/faqs';
import PricingTables from '@/components/landing-page/pricing-tables';
import TestimonialsGrid from '@/components/landing-page/testimonials-grid';

export const metadata = {
  title: 'Pricing - Simple',
  description: 'Page description',
};

export default function Pricing() {
  return (
    <>
      <PricingTables />
      <ComparePlans />
      <TestimonialsGrid />
      <Faqs />
      <CtaAlternative
        className='overflow-hidden'
        heading='Create your next project with Simple'
        buttonText='Start Free Trial'
        buttonLink='#0'
      />
    </>
  );
}
