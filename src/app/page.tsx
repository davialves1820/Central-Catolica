'use client';

import Header from "@/components/home/Header";
import Banner from "@/components/home/Banner";
import WelcomeSection from "@/components/home/WelcomeSection";
import InfoCards from "@/components/home/InfoCards";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Banner />
      <WelcomeSection />
      <InfoCards />
      <Footer />
    </div>
  );
}
