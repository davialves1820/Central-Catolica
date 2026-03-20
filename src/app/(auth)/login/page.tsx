"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSlowMessage, setShowSlowMessage] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShowSlowMessage(false);

    const timer = setTimeout(() => {
      setShowSlowMessage(true);
    }, 3000);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      clearTimeout(timer);

      if (result?.error) {
        setError("Email ou senha inválidos");
        return;
      }

      router.push("/");
    } catch {
      setError("Erro inesperado");
    } finally {
      setLoading(false);
      setShowSlowMessage(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-pearl dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-card dark:bg-zinc-900 p-8 shadow-xl border border-border dark:border-zinc-800">
        <div className="text-center">
          <h2 className="text-3xl font-heading font-bold tracking-tight text-primary dark:text-white">
            Paróquia Manager
          </h2>
          <p className="mt-2 text-sm font-body text-muted-foreground">
            Acesso Restrito - Catequese
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
              >
                E-mail
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-zinc-800 sm:text-sm"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-zinc-900 dark:text-white placeholder-zinc-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-zinc-800 sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a
                href="/auth/forgot-password"
                className="font-medium text-primary hover:text-accent transition-colors"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-crimson-light focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>

          {showSlowMessage && (
            <div className="text-center animate-pulse">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Preparando o ambiente... O login será efetuado em breve.
              </p>
            </div>
          )}
        </form>
        <div className="text-center mt-4">
          <a
            href="/cadastro"
            className="text-sm font-medium text-primary hover:text-accent dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Não tem uma conta? Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
}
