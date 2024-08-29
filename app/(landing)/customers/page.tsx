export const metadata = {
  title: 'Customers - Simple',
  description: 'Page description',
};

import WallOfLove from '@/components/landing-page/wall-of-love';
import Hero from './hero';
import CtaAlternative from '@/components/landing-page/cta-alternative';

export default function Customers() {
  return (
    <>
      <Hero />
      <WallOfLove />
      <CtaAlternative
        heading='Create your next project with Simple'
        buttonText='Start Free Trial'
        buttonLink='#0'
      />
    </>
  );
}
