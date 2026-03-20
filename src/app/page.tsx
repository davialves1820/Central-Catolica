"use client";

import Header from "@/components/shared/Header";
import Banner from "@/components/shared/Banner";
import FeaturedEvents from "@/components/events/FeaturedEvents";
import WelcomeSection from "@/components/shared/WelcomeSection";
import InfoCards from "@/components/shared/InfoCards";
import Footer from "@/components/shared/Footer";
import MapSection from "@/components/shared/MapSection";
import { AdminActionBar } from "@/components/shared/AdminActionBar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {session?.user?.role === "ADMIN" && <AdminActionBar />}
      <Banner />
      <FeaturedEvents />
      <WelcomeSection />
      <InfoCards />
      <MapSection />
      <Footer />
    </div>
  );
}
