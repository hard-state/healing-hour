import HeroSection from '@/components/HeroSection';
import HomeRevealSection from '@/components/HomeRevealSection';
import OurServicesSection from '@/components/OurServicesSection';
import OurTeamSection from '@/components/OurTeamSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import OurPricesSection from '@/components/OurPricesSection';
import LocationSection from '@/components/LocationSection';
import BookTodaySection from '@/components/BookTodaySection';
import ContactSection from '@/components/ContactSection';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-cream">
      <HeroSection />
      <OurTeamSection />
      <WhyChooseUsSection />
      <HomeRevealSection />
      <OurServicesSection />
      <OurPricesSection />
      <LocationSection />
      <BookTodaySection />
      <ContactSection />
                <WhatsAppFloat />
      
    </div>
  );
}
