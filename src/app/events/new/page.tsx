"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/shared/Header";
import EventForm from "@/components/events/EventForm";

export default function GeneralNewEventPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/");
    }
  }, [status, session, router]);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 2000);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-primary/10 font-body">
      <Header />

      <main className="grow relative overflow-hidden py-12 md:py-24">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-sm font-bold text-primary hover:text-accent transition-all mb-12 group"
            >
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center group-hover:bg-accent transition-all shadow-lg shadow-primary/20">
                <ArrowLeft size={18} />
              </div>
              <span className="font-heading tracking-wide uppercase text-xs">
                Voltar para o Início
              </span>
            </Link>

            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                <Sparkles size={12} className="text-accent" /> Publicação Geral
                (ADMIN)
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                Novo Evento ou Notícia
              </h1>
              <p className="text-muted-foreground text-lg font-body leading-relaxed max-w-xl">
                Crie um evento geral para a paróquia ou selecione uma pastoral
                específica abaixo.
              </p>
            </div>

            <EventForm
              isAdmin={true}
              onSuccess={handleSuccess}
              onCancel={() => router.push("/")}
            />
          </motion.div>
        </div>
      </main>

      {/* Success Modal */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl border border-primary/10"
            >
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="font-heading text-2xl font-bold mb-2 text-foreground">
                Publicado!
              </h2>
              <p className="text-muted-foreground font-body">
                O evento foi criado com sucesso.
              </p>
              <div className="mt-8 flex justify-center">
                <div className="w-16 h-1 bg-pearl rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 2, ease: "linear" }}
                    className="w-full h-full bg-accent"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
