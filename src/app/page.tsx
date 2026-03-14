'use client';

import Header from "@/components/home/Header";
import Banner from "@/components/home/Banner";
import WelcomeSection from "@/components/home/WelcomeSection";
import InfoCards from "@/components/home/InfoCards";
import Footer from "@/components/home/Footer";
import MapSection from "@/components/home/MapSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Banner />
      <WelcomeSection />
      <InfoCards />
      <MapSection />
      <Footer />
    </div>
  );
}
