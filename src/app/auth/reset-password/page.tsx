"use client";

import { useState, useTransition, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { resetPasswordConfirm } from "@/lib/server/actions/auth";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = (formData: FormData) => {
    setError("");
    setSuccess("");

    const password = formData.get("password") as string;

    startTransition(() => {
      resetPasswordConfirm({ password }, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-body">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-primary/5 text-center"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
            <Lock size={32} />
          </div>

          <h1 className="font-heading text-3xl font-bold text-primary mb-4 text-balance">
            Nova Senha
          </h1>
          <p className="text-muted-foreground mb-8 text-balance">
            Crie uma nova senha segura para sua conta.
          </p>

          {!success ? (
            <form action={onSubmit} className="space-y-6">
              <div className="relative group text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-2 block ml-1 italic">
                  Nova Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/40 group-focus-within:text-accent transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    disabled={isPending}
                    className="block w-full pl-11 pr-4 py-4 bg-pearl/30 border-2 border-primary/5 rounded-2xl focus:ring-accent focus:border-accent transition-all font-body text-primary placeholder:text-primary/20 outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold flex items-center gap-2 animate-pulse">
                  <span>⚠️ {error}</span>
                </div>
              )}

              {!token && (
                <div className="bg-yellow-50 text-yellow-700 p-4 rounded-xl text-sm font-bold">
                  Token ausente na URL. Use o link do e-mail.
                </div>
              )}

              <button
                type="submit"
                disabled={isPending || !token}
                className="w-full bg-primary hover:bg-accent text-white font-heading font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isPending ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Redefinir Senha
                    <CheckCircle2 size={18} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-8">
                <CheckCircle2 size={40} className="text-primary mx-auto mb-4" />
                <p className="text-primary font-bold italic">{success}</p>
              </div>
              <Link
                href="/login"
                className="w-full bg-primary hover:bg-accent text-white font-heading font-bold py-4 px-8 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                Ir para o Login
              </Link>
            </motion.div>
          )}

          {!success && (
            <div className="mt-10">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary/60 hover:text-accent transition-colors group"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Voltar para o Login
              </Link>
            </div>
          )}
        </motion.div>

        <p className="text-center text-primary/30 text-xs mt-8 font-heading tracking-widest uppercase">
          Paróquia Manager &copy; 2024
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <Loader2 className="animate-spin text-primary" size={40} />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
