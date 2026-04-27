"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export const Banner = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section ref={ref} className="relative h-[88vh] min-h-[560px] overflow-hidden">
      {/* Parallax Image */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 scale-110 will-change-transform"
      >
        <Image
          src="/images/church.jpg"
          alt="Igreja Paróquia Menino Jesus de Praga"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-transparent" />

      {/* Decorative cross pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 60px, rgba(255,255,255,0.3) 60px, rgba(255,255,255,0.3) 61px
          ), repeating-linear-gradient(
            90deg, transparent, transparent 60px, rgba(255,255,255,0.3) 60px, rgba(255,255,255,0.3) 61px
          )`,
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative h-full container mx-auto flex flex-col items-center justify-center text-center px-4"
      >
        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-px w-12 bg-accent/70" />
          <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] font-body">
            João Pessoa · Paraíba
          </span>
          <div className="h-px w-12 bg-accent/70" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-heading text-5xl md:text-7xl font-bold text-white mb-3 leading-[1.05]"
        >
          Seja Bem‑Vindo
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-xl md:text-2xl text-white/70 italic mb-2"
        >
          à Paróquia
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-2xl md:text-3xl font-bold text-accent mb-8"
        >
          Santo Menino Jesus de Praga
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="font-body text-base md:text-lg text-white/60 max-w-xl mb-12"
        >
          Encontre horários de missas, confissões, pastorais e muito mais.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <Link
            href="#horarios"
            className="group relative px-8 py-3.5 bg-accent text-white font-body font-bold rounded-full overflow-hidden shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-shadow duration-300"
          >
            <span className="relative z-10">Horários de Missa</span>
            <div className="absolute inset-0 bg-gold-dark translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Link>

          <Link
            href="#confissoes"
            className="px-8 py-3.5 border-2 border-white/40 text-white font-body font-medium rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
          >
            Confissões
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-body">Rolar</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;