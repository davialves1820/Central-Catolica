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
  const isCrismaCoordinator = session?.user?.pastorals?.some(
    (p: { slug: string; role: string }) => p.slug === "crisma" && p.role === "COORDENADOR"
  );
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {(isAdmin || isCrismaCoordinator) && (
        <AdminActionBar />
      )}
      <Banner />
      <FeaturedEvents />
      <WelcomeSection />
      <InfoCards />
      <MapSection />
      <Footer />
    </div>
  );
}
