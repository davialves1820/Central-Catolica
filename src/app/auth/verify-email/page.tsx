"use client";

import { useEffect, useState, useTransition, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, Sparkles } from "lucide-react";
import { verifyEmail } from "@/lib/server/actions/auth";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  useEffect(() => {
    if (!token) {
      startTransition(() => {
        setError("Token ausente!");
      });
      return;
    }

    startTransition(() => {
      verifyEmail(token).then((data) => {
        setSuccess(data.success);
        setError(data.error);
        if (data.success) {
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      });
    });
  }, [token, router]);

  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center p-4 font-body py-12">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 shadow-2xl border border-border/50 hover-lift relative overflow-hidden text-center"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-gold to-primary" />
          
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 p-4 opacity-10 text-primary pointer-events-none">
            <Sparkles size={80} />
          </div>

          <div className="relative z-10">
            {isPending && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-8 border border-primary/10">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
                <h1 className="font-heading text-2xl font-bold text-primary mb-2">
                  Verificando e-mail...
                </h1>
                <p className="text-muted-foreground text-sm italic">
                  Isso levará apenas um segundo.
                </p>
              </div>
            )}

            {!isPending && success && (
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-8 border border-green-100 shadow-lg shadow-green-100/20">
                  <CheckCircle2 size={32} />
                </div>
                <h1 className="font-heading text-3xl font-bold text-primary mb-4 italic">
                  Confirmado!
                </h1>
                <p className="text-muted-foreground mb-8 text-sm">
                  Seu endereço de e-mail foi verificado com sucesso. Você será
                  redirecionado para o login em breve.
                </p>
                <Link
                  href="/login"
                  className="w-full bg-primary hover:bg-crimson-light text-white font-semibold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  Ir para o Login Agora
                </Link>
              </div>
            )}

            {!isPending && error && (
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-8 border border-red-100">
                  <XCircle size={32} />
                </div>
                <h1 className="font-heading text-3xl font-bold text-primary mb-4 italic">
                  Ops! Algo deu errado
                </h1>
                <p className="text-muted-foreground mb-8 text-sm italic text-balance">
                  {error ||
                    "Não conseguimos verificar seu e-mail. O link pode ter expirado."}
                </p>
                <Link
                  href="/login"
                  className="w-full bg-primary hover:bg-crimson-light text-white font-semibold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                >
                  Voltar para o Login
                </Link>
              </div>
            )}
          </div>
          
          <div className="mt-10 pt-6 border-t border-border/50">
            <p className="text-primary/30 text-xs font-heading tracking-widest uppercase font-medium">
              Paróquia Manager &copy; 2024
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-pearl flex items-center justify-center p-4">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
