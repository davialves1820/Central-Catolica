"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { resetPasswordRequest } from "@/lib/server/actions/auth";

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = (formData: FormData) => {
    setError("");
    setSuccess("");

    const email = formData.get("email") as string;

    startTransition(() => {
      resetPasswordRequest({ email }).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center p-4 font-body py-12">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-10 shadow-2xl border border-border/50 hover-lift relative overflow-hidden text-center"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-gold to-primary" />
          
          <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 border border-primary/10">
            <Mail size={32} />
          </div>

          <h1 className="font-heading text-3xl font-bold text-primary mb-4 text-balance">
            Esqueceu a senha?
          </h1>
          <p className="text-muted-foreground mb-8 text-balance text-sm">
            Não se preocupe! Insira seu e-mail abaixo e enviaremos um link para
            você redefinir sua senha.
          </p>

          {!success ? (
            <form action={onSubmit} className="space-y-6">
              <div className="relative group text-left">
                <label className="block text-sm font-semibold text-zinc-700 mb-1.5 ml-1">
                  Endereço de E-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-gold transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    disabled={isPending}
                    className="block w-full pl-11 pr-4 py-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all font-body text-zinc-900 placeholder:text-zinc-400 outline-none sm:text-sm"
                    placeholder="exemplo@email.com"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-semibold border border-red-100 flex items-center gap-2">
                  <span>⚠️ {error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary hover:bg-crimson-light text-white font-semibold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Enviar link de acesso
                    <Mail
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-6"
            >
              <CheckCircle2 size={40} className="text-green-600 mx-auto mb-4" />
              <p className="text-green-800 font-semibold">{success}</p>
            </motion.div>
          )}

          <div className="mt-10 pt-6 border-t border-border/50">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold transition-colors group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Voltar para o Login
            </Link>
          </div>
        </motion.div>

        <p className="text-center text-primary/30 text-xs mt-8 font-heading tracking-widest uppercase font-medium">
          Paróquia Manager &copy; 2024
        </p>
      </div>
    </div>
  );
}
