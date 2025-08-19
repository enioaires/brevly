import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ServicesSection } from '@/components/services-section';
import { ContactSection } from '@/components/contact-section';

export default async function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}