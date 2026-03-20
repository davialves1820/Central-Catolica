import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Type,
  FileText,
  Calendar,
  Image as ImageIcon,
  AlertCircle,
  Tag,
  CheckCircle2,
} from "lucide-react";
import NextImage from "next/image";
import api from "@/lib/client/api";

interface EventFormProps {
  pastoralId?: string;
  pastoralName?: string;
  isAdmin?: boolean;
  onSuccess: (event: { id: string; [key: string]: unknown }) => void;
  onCancel: () => void;
}

const EVENT_TYPES = [
  { value: "EVENT", label: "Evento" },
  { value: "NEWS", label: "Notícia" },
  { value: "PASTORAL", label: "Avisos da Pastoral" },
  { value: "REGISTRATION", label: "Inscrições" },
];

const EventForm = ({
  pastoralId,
  pastoralName,
  isAdmin,
  onSuccess,
  onCancel,
}: EventFormProps) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pastorals, setPastorals] = useState<{ id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    start_date: "",
    end_date: "",
    type: "EVENT",
    pastoral_id: pastoralId || "",
    meeting_location: "",
  });

  useEffect(() => {
    if (isAdmin) {
      api.get("/pastorals").then((res) => setPastorals(res.data));
    }
  }, [isAdmin]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    body.append("path", "events");

    try {
      const response = await api.post("/upload", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFormData((prev) => ({ ...prev, image_url: response.data.url }));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erro ao fazer upload da imagem.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/events", formData);
      onSuccess(response.data);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      console.error("Error creating event:", err);
      alert(
        err.response?.data?.error ||
        "Erro ao criar evento. Verifique os dados e tente novamente.",
      );
    } finally {
      setLoading(false);
    }
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
            Informações do Evento
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="md:col-span-2 space-y-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
              Título do Evento
            </label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Ex: Retiro Espiritual 2024"
              className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-2xl px-6 py-4 outline-none transition-all text-zinc-900 font-body"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 flex items-center gap-2">
              <Tag size={14} className="text-accent" />
              Tipo de Publicação
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-2xl px-6 py-4 outline-none transition-all text-zinc-900 font-body appearance-none"
            >
              {EVENT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
              Vincular a Pastoral
            </label>
            {isAdmin ? (
              <select
                value={formData.pastoral_id}
                onChange={(e) =>
                  setFormData({ ...formData, pastoral_id: e.target.value })
                }
                className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-2xl px-6 py-4 outline-none transition-all text-zinc-900 font-body appearance-none"
              >
                <option value="">Nenhuma (Evento Geral)</option>
                {pastorals.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                disabled
                type="text"
                value={pastoralName || "Não informada"}
                className="w-full bg-pearl border border-border/50 rounded-2xl px-6 py-4 text-primary/60 font-body font-bold"
              />
            )}
          </div>

          <div className="md:col-span-2 space-y-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1 flex items-center gap-2">
              <FileText size={14} className="text-primary" />
              Descrição Detalhada
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Descreva o que acontecerá, local, horários e outras informações importantes..."
              rows={4}
              className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-4xl px-6 py-5 outline-none transition-all resize-none text-zinc-900 font-body leading-relaxed"
            />
          </div>

          <div className="md:col-span-2 space-y-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
              Local do Encontro
            </label>
            <input
              type="text"
              value={formData.meeting_location}
              onChange={(e) =>
                setFormData({ ...formData, meeting_location: e.target.value })
              }
              placeholder="Ex: Salão Paroquial, Auditório, etc."
              className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-2xl px-6 py-4 outline-none transition-all text-zinc-900 font-body"
            />
          </div>
        </div>
      </div>

      {/* Dates Card */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-primary/5 border border-primary/10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
            <Calendar size={20} />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Agendamento
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
              Data de Início
            </label>
            <input
              type="datetime-local"
              value={formData.start_date}
              onChange={(e) =>
                setFormData({ ...formData, start_date: e.target.value })
              }
              className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-2xl px-6 py-4 outline-none transition-all text-zinc-900 font-body"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
              Data de Término (Opcional)
            </label>
            <input
              type="datetime-local"
              value={formData.end_date}
              onChange={(e) =>
                setFormData({ ...formData, end_date: e.target.value })
              }
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
              Foto do Evento
            </label>

            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="event-image-upload"
              />
              <label
                htmlFor="event-image-upload"
                className="flex flex-col items-center justify-center w-full aspect-video bg-white border-2 border-dashed border-border/50 hover:border-accent/40 hover:bg-accent/5 rounded-[2.5rem] cursor-pointer transition-all gap-4 group overflow-hidden relative shadow-inner"
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
                        <Upload size={14} /> Mudar Foto
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
                    <span className="block text-sm font-bold text-zinc-700">
                      Escolher imagem para o evento
                    </span>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="space-y-8 flex flex-col justify-center">
            <div className="space-y-3">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
                Ou use um Link Externo
              </label>
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                placeholder="https://..."
                className="w-full bg-white border border-border/50 focus:border-accent/40 rounded-2xl px-6 py-4 outline-none transition-all text-sm text-zinc-900 font-mono"
              />
            </div>

            <div className="bg-primary/5 p-6 rounded-4xl border border-primary/10">
              <h4 className="font-heading font-bold text-sm text-primary mb-2 flex items-center gap-2">
                <AlertCircle size={16} />
                Dica Visual
              </h4>
              <p className="text-xs font-body text-primary/70 leading-relaxed">
                Imagens retangulares (paisagem) funcionam melhor nos destaques
                da página inicial.
              </p>
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
              <CheckCircle2
                size={22}
                className="group-hover:scale-110 transition-transform"
              />
              Publicar Evento
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-10 py-5 rounded-3xl font-body font-bold text-muted-foreground hover:text-foreground hover:bg-black/5 transition-all text-center"
        >
          Descartar
        </button>
      </div>
    </form>
  );
};

export default EventForm;
