"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import api from "@/lib/client/api";
import { Pastoral } from "@/types";
import { PastoralCard } from "./PastoralCard";

const Pastorais = () => {
  const { data: session, status } = useSession();
  const [pastorals, setPastorals] = useState<Pastoral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPastorals = async () => {
      try {
        const response = await api.get("/pastorals");
        setPastorals(response.data);
      } catch (error) {
        console.error("Error fetching pastorals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPastorals();
  }, []);

  const isLoaded = status !== "loading";
  const isAdmin = status === "authenticated" && session?.user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="grow py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="flex-1">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4 text-center md:text-left">
                  Pastorais e Movimentos
                </h1>
                <div className="w-20 h-1 bg-accent rounded-full mx-auto md:mx-0" />
                <p className="mt-6 font-body text-muted-foreground text-lg max-w-2xl text-center md:text-left">
                  Conheça os diversos grupos, pastorais e movimentos que dão
                  vida à nossa comunidade paroquial.
                </p>
              </div>

              {isLoaded && isAdmin && (
                <Link
                  href="/pastorais/new"
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-body font-bold transition-all shadow-lg hover:shadow-primary/20 shrink-0"
                >
                  <Plus size={20} />
                  Adicionar Pastoral
                </Link>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastorals.map((pastoral, i) => (
                  <PastoralCard
                    key={pastoral.id}
                    pastoral={pastoral}
                    index={i}
                  />
                ))}
                {pastorals.length === 0 && (
                  <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-primary/20">
                    <p className="text-primary/60">
                      Nenhuma pastoral encontrada.
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pastorais;
