"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export const Banner = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <Image
        src="/images/church.jpg"
        alt="Hero Church"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-b from-foreground/60 via-foreground/40 to-foreground/70" />

      <div className="relative h-full container mx-auto flex flex-col items-center justify-center text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4 leading-tight"
        >
          Seja Bem-Vindo!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-body text-lg md:text-xl text-primary-foreground/90 max-w-2xl"
        >
          Paróquia Santo Menino Jesus de Praga! Encontre informações sobre
          missas, confissões, pastorais e muito mais.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex gap-4 flex-wrap justify-center"
        >
          <Link
            href="#horarios"
            className="px-6 py-3 bg-accent text-accent-foreground font-body font-bold rounded-lg hover:bg-gold-dark transition-colors duration-300"
          >
            Horários de Missa
          </Link>
          <Link
            href="#confissoes"
            className="px-6 py-3 border-2 border-primary-foreground/50 text-primary-foreground font-body font-medium rounded-lg hover:bg-primary-foreground/10 transition-colors duration-300"
          >
            Confissões
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
