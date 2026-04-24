"use client";

import { Save, Upload, Type, Info, Image as ImageIcon, MapPin, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import NextImage from "next/image";
import Link from "next/link";
import { useState } from "react";
import api from "@/lib/client/api";

interface PastoralEditFormProps {
  slug: string;
  initialData: {
    name: string;
    slug: string;
    description: string;
    image_url: string;
    instagram: string;
    meeting_location: string;
    coordinatorIds: string[];
  };
  isAdmin: boolean;
  onSubmit: (data: Record<string, string | string[]>) => Promise<void>;
  loading: boolean;
}

export default function PastoralEditForm({ slug, initialData, isAdmin, onSubmit, loading }: PastoralEditFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [uploading, setUploading] = useState(false);

  const handleNameChange = (name: string) => {
    if (!isAdmin) {
      setFormData({ ...formData, name });
      return;
    }

    const newSlug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData({ ...formData, name, slug: newSlug });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    body.append("path", "pastorals");

    try {
      const response = await api.post("/upload", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({ ...prev, image_url: response.data.url }));
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* General Info Card */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-primary/5 border border-primary/10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Type size={20} />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
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
              className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-2xl px-6 py-4 outline-none transition-all text-zinc-900 font-body"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 flex items-center justify-between">
              Slug na URL
              {!isAdmin && (
                <span className="text-[9px] text-accent/60">
                  Apenas Admins
                </span>
              )}
            </label>
            <div className="relative group">
              <input
                required
                disabled={!isAdmin}
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="pastoral-familiar"
                className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-2xl px-6 py-4 outline-none transition-all text-zinc-900 font-mono text-sm pl-12 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <Info
                size={16}
                className={`absolute left-6 top-1/2 -translate-y-1/2 ${isAdmin ? "text-muted-foreground/60 group-focus-within:text-accent" : "text-muted-foreground/30"} transition-colors`}
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
              Descrição Atualizada
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
              placeholder="Fale sobre os encontros e missões atuais..."
              rows={4}
              className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-4xl px-6 py-5 outline-none transition-all resize-none text-zinc-900 font-body leading-relaxed"
            />
          </div>

          <div className="md:col-span-2 space-y-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 flex items-center gap-2">
              <MapPin size={14} className="text-accent" />
              Local dos Encontros
            </label>
            <input
              type="text"
              value={formData.meeting_location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  meeting_location: e.target.value,
                })
              }
              placeholder="Ex: Salão Paroquial, Sala 02..."
              className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-2xl px-6 py-4 outline-none transition-all text-zinc-900 font-body"
            />
          </div>
        </div>
      </div>

      {/* Multimedia Card */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-primary/5 border border-primary/10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
            <ImageIcon size={20} />
          </div>
          <h2 className="font-heading text-xl font-bold text-foreground">
            Identidade Visual
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
              Nova Foto de Capa
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
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
                        <Upload size={14} /> Mudar Foto
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-accent/5 flex items-center justify-center mx-auto group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <Upload size={28} className="text-muted-foreground group-hover:text-white transition-colors" />
                    </div>
                    <span className="block text-sm font-bold text-zinc-700 dark:text-zinc-200">Escolher nova imagem</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-8 flex flex-col justify-center">
            <div className="space-y-3">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Link Externo da Imagem</label>
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="@pastoral_escolhida"
                className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-2xl px-6 py-4 outline-none transition-all text-zinc-900 font-body"
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
              <Save size={22} className="group-hover:rotate-12 transition-transform" />
              Salvar Alterações
            </>
          )}
        </button>

        <Link
          href={`/pastorais/${slug}`}
          className="w-full sm:w-auto px-10 py-5 rounded-3xl font-body font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all text-center"
        >
          Descartar
        </Link>
      </div>
    </form>
  );
}
