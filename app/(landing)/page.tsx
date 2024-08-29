import BusinessCategories from '@/components/landing-page/business-categories';
import Cta from '@/components/landing-page/cta';
import FeaturesHome from '@/components/landing-page/features-home';
import FeaturesPlanet from '@/components/landing-page/features-planet';
import HeroHome from '@/components/landing-page/hero-home';
import LargeTestimonial from '@/components/landing-page/large-testimonial';
import TestimonialsCarousel from '@/components/landing-page/testimonials-carousel';

export const metadata = {
  title: 'Home - Simple',
  description: 'Page description',
};

export default function Home() {
  return (
    <>
      <HeroHome />
      <BusinessCategories />
      <LargeTestimonial />
      <FeaturesPlanet />
      <FeaturesHome />
      <TestimonialsCarousel />
      <Cta />
    </>
  );
}
