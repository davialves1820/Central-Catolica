"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const WelcomeSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="relative container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="shrink-0"
          >
            <Image
              src="/images/menino-jesus-logo.png"
              alt="Santo Menino Jesus de Praga"
              width={224}
              height={224}
              className="w-48 h-48 md:w-56 md:h-56 object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
              Nosso Santuário
            </h2>
            <div className="w-16 h-1 bg-accent mb-6 rounded-full" />
            <p className="font-body text-foreground leading-relaxed mb-4">
              Nosso site foi pensado para que você encontre as informações que
              precisa, com rapidez e de forma simples. Aqui você fica sabendo
              dos horários de missas, de confissões, do funcionamento da
              secretaria e também pode conhecer nossos movimentos, pastorais e
              associações.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Enfim, aqui você vai ver que nossa comunidade está a pleno vapor
              na construção do Reino.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
