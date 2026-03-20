"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Upload,
  Info,
  Type,
  Users,
  Instagram,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import NextImage from "next/image";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import api from "@/lib/client/api";

export default function NewPastoralPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image_url: "",
    instagram: "",
    coordinatorIds: [] as string[],
  });

  const [uploading, setUploading] = useState(false);
  const [users, setUsers] = useState<{ id: string; full_name: string | null; email: string; role: string }[]>([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Auth guard
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (
    status === "unauthenticated" ||
    (status === "authenticated" && session?.user?.role !== "ADMIN")
  ) {
    router.push("/pastorais");
    return null;
  }

  const handleNameChange = (name: string) => {
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData({ ...formData, name, slug });
  };

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      alert(`O arquivo é muito grande. O limite máximo é de ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
      // Reset input
      e.target.value = "";
      return;
    }

    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    body.append("path", "pastorals");

    try {
      const response = await api.post("/upload", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.data?.url) {
        // Use functional storage to avoid stale formData
        setFormData(prev => ({ ...prev, image_url: response.data.url }));
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erro ao fazer upload da imagem. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  const toggleCoordinator = (userId: string) => {
    setFormData((prev) => ({
      ...prev,
      coordinatorIds: prev.coordinatorIds.includes(userId)
        ? prev.coordinatorIds.filter((id) => id !== userId)
        : [...prev.coordinatorIds, userId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/pastorals", formData);
      setSuccess(true);
      setTimeout(() => {
        router.push("/pastorais");
        router.refresh();
      }, 2000);
    } catch (error) {
      console.error("Error creating pastoral:", error);
      alert("Erro ao criar pastoral. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-primary/10 font-body">
      <Header />

      <main className="grow relative overflow-hidden py-12 md:py-24">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/pastorais"
              className="inline-flex items-center gap-3 text-sm font-bold text-primary hover:text-accent transition-all mb-12 group"
            >
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center group-hover:bg-accent transition-all shadow-lg shadow-primary/20">
                <ArrowLeft size={18} />
              </div>
              <span className="font-heading tracking-wide uppercase text-xs">
                Voltar para Pastorais
              </span>
            </Link>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Form Content */}
              <div className="flex-1">
                <div className="mb-10">
                  <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                    Nova Pastoral
                  </h1>
                  <p className="text-muted-foreground text-lg font-body leading-relaxed max-w-xl">
                    Cadastre uma nova comunidade, preenchendo as informações
                    essenciais abaixo. Use imagens impactantes para atrair novos
                    membros.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* General Info Card */}
                  <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-primary/10 border border-primary/20">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-crimson/10 flex items-center justify-center text-crimson">
                        <Type size={20} />
                      </div>
                      <h2 className="font-heading text-xl font-bold text-foreground">
                        Informações Básicas
                      </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
                          Nome da Pastoral
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleNameChange(e.target.value)}
                          placeholder="Ex: Pastoral Familiar"
                          className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-2xl px-6 py-4 outline-none transition-all text-zinc-900 placeholder:text-muted-foreground/50 font-body"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
                          Slug na URL
                        </label>
                        <div className="relative group">
                          <input
                            required
                            type="text"
                            value={formData.slug}
                            onChange={(e) =>
                              setFormData({ ...formData, slug: e.target.value })
                            }
                            placeholder="pastoral-familiar"
                            className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-2xl px-6 py-4 outline-none transition-all text-zinc-900 font-mono text-sm pl-12"
                          />
                          <Info
                            size={16}
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/60 group-focus-within:text-accent transition-colors"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-3">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
                          Descrição Detalhada
                        </label>
                        <textarea
                          required
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          placeholder="Descreva a missão, encontros e objetivos desta pastoral..."
                          rows={4}
                          className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-4xl px-6 py-5 outline-none transition-all resize-none text-zinc-900 font-body leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Multimedia & Social */}
                  <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-primary/5 border border-primary/10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                        <ImageIcon size={20} />
                      </div>
                      <h2 className="font-heading text-xl font-bold text-foreground">
                        Mídia e Redes Sociais
                      </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
                          Imagem de Capa
                        </label>

                        <div className="relative group">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full aspect-4/3 bg-white border-2 border-dashed border-border/50 hover:border-accent/40 hover:bg-accent/5 rounded-[2.5rem] cursor-pointer transition-all gap-4 group overflow-hidden relative shadow-inner"
                          >
                            {uploading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full"
                              />
                            ) : formData.image_url ? (
                              <>
                                <NextImage
                                  src={formData.image_url}
                                  alt="Preview"
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white text-xs font-bold flex items-center gap-2">
                                    <Upload size={14} /> Alterar Imagem
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="text-center p-6 space-y-4">
                                <div className="w-16 h-16 rounded-full bg-accent/5 flex items-center justify-center mx-auto group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                  <Upload
                                    size={28}
                                    className="text-muted-foreground group-hover:text-white transition-colors"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <span className="block text-sm font-bold text-zinc-700 dark:text-zinc-200">
                                    Clique para carregar
                                  </span>
                                  <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                                    PNG, JPG ou WEBP (Max 5MB)
                                  </span>
                                </div>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      <div className="space-y-8 flex flex-col justify-center">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
                            URL da Imagem (Opcional)
                          </label>
                          <input
                            type="text"
                            value={formData.image_url}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                image_url: e.target.value,
                              })
                            }
                            placeholder="https://..."
                            className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-2xl px-6 py-4 outline-none transition-all text-sm text-zinc-900 font-mono"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Instagram size={14} className="text-[#E4405F]" />
                            Instagram
                          </label>
                          <input
                            type="text"
                            value={formData.instagram}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                instagram: e.target.value,
                              })
                            }
                            placeholder="@pastoral_escolhida"
                            className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-2xl px-6 py-4 outline-none transition-all text-zinc-900 placeholder:text-muted-foreground/40 font-body"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submission Action */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                    <button
                      disabled={loading || uploading}
                      type="submit"
                      className="w-full sm:flex-1 h-16 flex items-center justify-center gap-3 bg-primary hover:bg-primary/95 text-primary-foreground rounded-3xl font-heading text-lg font-bold transition-all shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out opacity-10" />
                      {loading ? (
                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Save
                            size={22}
                            className="group-hover:rotate-12 transition-transform"
                          />
                          Salvar Nova Pastoral
                        </>
                      )}
                    </button>

                    <Link
                      href="/pastorais"
                      className="w-full sm:w-auto px-10 py-5 rounded-3xl font-body font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                    >
                      Cancelar
                    </Link>
                  </div>
                </form>
              </div>

              {/* Sidebar: Coordinators & Preview */}
              <aside className="lg:w-80 space-y-10">
                {/* Coordinators Card */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-primary/5 border border-primary/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Users size={16} />
                    </div>
                    <h3 className="font-heading font-bold text-foreground">
                      Coordenadores
                    </h3>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {users.map((user) => (
                      <label
                        key={user.id}
                        className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border ${formData.coordinatorIds.includes(user.id)
                            ? "bg-primary/5 border-primary/30 ring-1 ring-primary/20"
                            : "bg-white border-border/50 hover:border-primary/30"
                          }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-all ${formData.coordinatorIds.includes(user.id)
                              ? "bg-primary text-white shadow-lg shadow-primary/20"
                              : "bg-pearl text-primary/60"
                            }`}
                        >
                          {user.full_name?.charAt(0) || user.email.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-bold truncate ${formData.coordinatorIds.includes(user.id) ? "text-foreground" : "text-zinc-700 dark:text-zinc-300"}`}
                          >
                            {user.full_name || user.email.split("@")[0]}
                          </p>
                          <p className="text-[10px] text-muted-foreground truncate uppercase tracking-tighter">
                            {user.role}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={formData.coordinatorIds.includes(user.id)}
                          onChange={() => toggleCoordinator(user.id)}
                          className="hidden"
                        />
                        {formData.coordinatorIds.includes(user.id) && (
                          <CheckCircle2
                            size={16}
                            className="text-primary shrink-0"
                          />
                        )}
                      </label>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-pearl rounded-2xl border border-primary/10 text-primary/80">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-center">
                      {formData.coordinatorIds.length} selecionado
                      {formData.coordinatorIds.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {/* Requirements/Tips */}
                <div className="bg-primary/95 text-white rounded-[2.5rem] p-8 shadow-2xl shadow-primary/30 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-x-8 -translate-y-8" />
                  <h4 className="font-heading font-bold mb-4 flex items-center gap-2">
                    <AlertCircle size={18} />
                    Dicas de Cadastro
                  </h4>
                  <ul className="space-y-4 text-xs font-body text-white/80 leading-relaxed">
                    <li className="flex gap-2">
                      <ChevronRight
                        size={14}
                        className="shrink-0 text-accent"
                      />
                      Escolha nomes curtos e impactantes para o slug da URL.
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight
                        size={14}
                        className="shrink-0 text-accent"
                      />
                      Uma boa descrição aumenta a participação em 40%.
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight
                        size={14}
                        className="shrink-0 text-accent"
                      />
                      Adicione ao menos um coordenador para gerenciar a página.
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
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
                Excelente!
              </h2>
              <p className="text-muted-foreground font-body">
                A pastoral foi criada com sucesso e já está disponível para
                visualização.
              </p>
              <div className="mt-8 flex justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-accent"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
