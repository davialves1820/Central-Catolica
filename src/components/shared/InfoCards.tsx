"use client";

import { motion } from "framer-motion";
import { Clock, Cross } from "lucide-react";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const InfoCards = () => {
  return (
    <section className="py-20 section-pearl" id="horarios">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl font-bold text-primary text-center mb-12"
        >
          Informações da Paróquia
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Mass Schedule */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="bg-background rounded-xl p-8 shadow-sm border border-border text-center"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-primary" size={28} />
            </div>
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Horário de Missas
            </h3>
            <div className="font-body text-sm text-foreground space-y-3">
              <div>
                <p className="font-bold">Terça e Quarta</p>
                <p className="text-muted-foreground">6h30</p>
              </div>
              <div>
                <p className="font-bold">Quinta e Sexta</p>
                <p className="text-muted-foreground">6h30 e 19h30</p>
              </div>
              <div>
                <p className="font-bold">Sábado</p>
                <p className="text-muted-foreground">19h</p>
              </div>
              <div>
                <p className="font-bold">Domingo</p>
                <p className="text-muted-foreground">8h, 11h e 17h30</p>
              </div>
            </div>
          </motion.div>

          {/* Confessions */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="bg-background rounded-xl p-8 shadow-sm border border-border text-center"
            id="confissoes"
          >
            <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cross className="text-accent" size={28} />
            </div>
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Confissões
            </h3>
            <div className="font-body text-sm text-foreground space-y-3">
              <p className="text-muted-foreground text-xs italic mb-2">
                Por ordem de chegada e sujeito a alteração
              </p>
              <div>
                <p className="font-bold">Quarta e Quinta</p>
                <p className="text-muted-foreground">14h30 às 16h30</p>
              </div>
            </div>
          </motion.div>

          {/* Secretaria */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="bg-background rounded-xl p-8 shadow-sm border border-border text-center"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-primary" size={28} />
            </div>

            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Secretaria Paroquial
            </h3>

            <div className="font-body text-sm text-foreground space-y-3">
              <div>
                <p className="font-bold">Terça a Sexta</p>
                <p className="text-muted-foreground">13h às 16h30</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
