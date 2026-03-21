"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/client/api";
import axios from "axios";
import Link from "next/link";

export default function CadastroPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCadastro = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await api.post("/auth/register", { fullName, email, password });
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000); // Redirect to login after 3 seconds
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ??
            err.response?.data?.errors?.[0]?.message ??
            "Erro ao criar conta.",
        );
      } else {
        setError("Erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-pearl px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-10 shadow-2xl border border-border/50 hover-lift relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-gold to-primary" />
        <div className="text-center">
          <h2 className="text-4xl font-heading font-bold tracking-tight text-primary">
            Criar Conta
          </h2>
          <div className="mx-auto mt-2 h-1 w-12 bg-gold rounded-full" />
          <p className="mt-4 text-sm font-body text-muted-foreground font-medium uppercase tracking-wider">
            Paróquia Manager
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleCadastro}>
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg bg-green-50 p-4 text-sm text-green-600 border border-green-100">
              Conta criada com sucesso! Redirecionando para o login...
            </div>
          )}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label
                htmlFor="full-name"
                className="block text-sm font-semibold text-zinc-700 mb-1.5"
              >
                Nome Completo
              </label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                required
                className="relative block w-full rounded-xl border border-border bg-white/50 px-4 py-2.5 text-zinc-900 placeholder-zinc-400 transition-all focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 sm:text-sm"
                placeholder="Seu nome completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-semibold text-zinc-700 mb-1.5"
              >
                E-mail
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-xl border border-border bg-white/50 px-4 py-2.5 text-zinc-900 placeholder-zinc-400 transition-all focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 sm:text-sm"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-zinc-700 mb-1.5"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="relative block w-full rounded-xl border border-border bg-white/50 px-4 py-2.5 text-zinc-900 placeholder-zinc-400 transition-all focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || success}
              className="group relative flex w-full justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-crimson-light focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              {loading ? "Criando conta..." : "Criar Conta"}
            </button>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-border/50">
            <Link
              href="/login"
              className="text-sm font-semibold text-primary hover:text-gold transition-colors"
            >
              Já tem uma conta? <span className="underline decoration-gold/50 decoration-2 underline-offset-4">Entrar</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
