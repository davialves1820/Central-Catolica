'use client';

import { motion } from "framer-motion";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { pastorais } from "./constants";
import { PastoralCard } from "./PastoralCard";

const Pastorais = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="grow py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-12">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4 text-center md:text-left">
                Pastorais e Movimentos
              </h1>
              <div className="w-20 h-1 bg-accent rounded-full mx-auto md:mx-0" />
              <p className="mt-6 font-body text-muted-foreground text-lg max-w-2xl text-center md:text-left">
                Conheça os diversos grupos, pastorais e movimentos que dão vida à nossa comunidade paroquial.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastorais.map((pastoral, i) => (
                <PastoralCard
                  key={pastoral.id}
                  pastoral={pastoral}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pastorais;