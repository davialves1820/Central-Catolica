import Header from "@/components/shared/Header";
import Banner from "@/components/shared/Banner";
import FeaturedEvents from "@/components/events/FeaturedEvents";
import WelcomeSection from "@/components/shared/WelcomeSection";
import InfoCards from "@/components/shared/InfoCards";
import Footer from "@/components/shared/Footer";
import MapSection from "@/components/shared/MapSection";
import { AdminActionBar } from "@/components/shared/AdminActionBar";
import { auth } from "@/lib/server/auth";

export default async function Home() {
  const session = await auth();
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
