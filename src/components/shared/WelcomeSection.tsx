"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Users, Church } from "lucide-react";

const stats = [
  { icon: Church, label: "Anos de Missão", value: "30+" },
  { icon: Users, label: "Famílias Atendidas", value: "2.000+" },
  { icon: Heart, label: "Pastorais Ativas", value: "12+" },
];

const WelcomeSection = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative max-w-5xl mx-auto">

          {/* Decorative blob behind image */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-72 h-72 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-12 bottom-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center gap-14">

            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 relative"
            >
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-accent/20 animate-[spin_30s_linear_infinite]" />
              <div className="relative w-52 h-52 md:w-64 md:h-64">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-primary/10" />
                <Image
                  src="/images/menino-jesus-logo.png"
                  alt="Santo Menino Jesus de Praga"
                  fill
                  className="object-contain p-4 drop-shadow-xl"
                />
              </div>
            </motion.div>

            {/* Text side */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-8 bg-accent" />
                  <span className="text-accent text-xs font-bold uppercase tracking-[0.2em] font-body">
                    Nossa História
                  </span>
                </div>

                <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-5 leading-tight">
                  Um lar de fé no<br className="hidden md:block" /> coração de João Pessoa
                </h2>

                <p className="font-body text-foreground/70 leading-relaxed mb-4">
                  Nosso site foi pensado para que você encontre as informações que
                  precisa, com rapidez e de forma simples. Aqui você fica sabendo
                  dos horários de missas, de confissões, do funcionamento da
                  secretaria e também pode conhecer nossos movimentos, pastorais e
                  associações.
                </p>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Enfim, aqui você vai ver que nossa comunidade está a pleno vapor
                  na construção do Reino de Deus.
                </p>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mt-8 grid grid-cols-3 gap-4"
              >
                {stats.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="group text-center p-4 rounded-2xl bg-pearl/60 border border-border/50 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                  >
                    <Icon size={18} className="text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="font-heading text-xl font-bold text-primary">{value}</p>
                    <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;