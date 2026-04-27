"use client";

import { motion, Variants } from "framer-motion";
import { Clock, Cross, BookOpen } from "lucide-react";

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

interface ScheduleRow {
  day: string;
  times: string[];
}

interface InfoCardProps {
  index: number;
  icon: React.ReactNode;
  accentColor: string;
  title: string;
  children: React.ReactNode;
  note?: string;
}

const InfoCard = ({ index, icon, accentColor, title, children, note }: InfoCardProps) => (
  <motion.div
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={fadeUpVariant}
    className="group relative bg-white rounded-3xl p-8 shadow-sm border border-border hover:border-transparent hover:shadow-xl hover:shadow-primary/8 transition-all duration-500 overflow-hidden"
  >
    {/* Hover gradient background */}
    <div
      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${accentColor}`}
    />

    {/* Top accent line */}
    <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="relative z-10">
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-primary/5 group-hover:bg-white/60 flex items-center justify-center mb-6 transition-colors duration-300 border border-primary/5 group-hover:border-white/40">
        {icon}
      </div>

      <h3 className="font-heading text-xl font-bold text-primary mb-5 group-hover:text-primary transition-colors">
        {title}
      </h3>

      <div className="font-body text-sm text-foreground space-y-0">
        {children}
      </div>

      {note && (
        <p className="mt-5 text-[11px] text-muted-foreground italic border-t border-border/50 pt-3 group-hover:border-white/30 transition-colors">
          {note}
        </p>
      )}
    </div>
  </motion.div>
);

const ScheduleRow = ({ day, times }: ScheduleRow) => (
  <div className="flex items-start justify-between py-3 border-b border-border/40 last:border-0 group-last:border-0">
    <span className="font-bold text-foreground/80 text-sm">{day}</span>
    <div className="flex flex-col items-end gap-0.5">
      {times.map((t) => (
        <span key={t} className="text-muted-foreground text-sm font-medium">
          {t}
        </span>
      ))}
    </div>
  </div>
);

const InfoCards = () => {
  return (
    <section className="py-24 bg-pearl/60" id="horarios">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-4">
            <BookOpen size={12} />
            Comunidade
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary">
            Informações da Paróquia
          </h2>
          <p className="mt-3 font-body text-muted-foreground max-w-md mx-auto">
            Confira os horários e serviços disponíveis para a nossa comunidade.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Missas */}
          <InfoCard
            index={0}
            accentColor="bg-gradient-to-br from-primary/5 to-accent/5"
            icon={<Clock className="text-primary" size={26} />}
            title="Horário de Missas"
          >
            <ScheduleRow day="Terça e Quarta" times={["6h30"]} />
            <ScheduleRow day="Quinta e Sexta" times={["6h30", "19h30"]} />
            <ScheduleRow day="Sábado" times={["19h"]} />
            <ScheduleRow day="Domingo" times={["8h", "11h", "17h30"]} />
          </InfoCard>

          {/* Confissões */}
          <InfoCard
            index={1}
            accentColor="bg-gradient-to-br from-accent/5 to-gold-light/10"
            icon={<Cross className="text-accent" size={26} />}
            title="Confissões"
            note="Por ordem de chegada e sujeito a alteração."
          >
            <div
              id="confissoes"
              className="flex items-center justify-between py-3 border-b border-border/40"
            >
              <span className="font-bold text-foreground/80 text-sm">
                Quarta e Quinta
              </span>
              <span className="text-muted-foreground text-sm font-medium">
                14h30 – 16h30
              </span>
            </div>
            <p className="pt-4 text-sm text-muted-foreground leading-relaxed">
              O sacramento da reconciliação está disponível aos fiéis que desejam renovar a graça batismal.
            </p>
          </InfoCard>

          {/* Secretaria */}
          <InfoCard
            index={2}
            accentColor="bg-gradient-to-br from-primary/5 to-primary/10"
            icon={<Clock className="text-primary" size={26} />}
            title="Secretaria Paroquial"
          >
            <ScheduleRow day="Terça a Sexta" times={["13h – 16h30"]} />
            <p className="pt-4 text-sm text-muted-foreground leading-relaxed">
              Atendimento presencial para batizados, casamentos, declarações e demais serviços administrativos.
            </p>
          </InfoCard>
        </div>
      </div>
    </section>
  );
};

export default InfoCards;