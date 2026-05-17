import { Metadata } from 'next';
import { HeroSection } from '@/components/catequese/HeroSection';
import { CategoryGrid } from '@/components/catequese/CategoryGrid';

export const metadata: Metadata = {
  title: 'Catequese',
  description: 'Explore os fundamentos da Igreja Católica, desde os mistérios dos Sacramentos até a riqueza dos períodos litúrgicos.',
};

export default function CatequesePage() {
  return (
    <div className="bg-[#fbf9f4] text-[#1b1c19] selection:bg-[#ffe08f]/30 selection:text-[#584400]">
      <HeroSection />
      <CategoryGrid />
    </div>
  );
}
