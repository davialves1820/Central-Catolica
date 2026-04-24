"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Edit3 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import api from "@/lib/client/api";
import PastoralEditForm from "@/components/pastorais/PastoralEditForm";
import CoordinationSidebar from "@/components/pastorais/CoordinationSidebar";

export default function EditPastoralPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = use(paramsPromise);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image_url: "",
    instagram: "",
    meeting_location: "",
    coordinatorIds: [] as string[],
  });

  const [users, setUsers] = useState<any[]>([]);
  const [success, setSuccess] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const isAdminUser = session?.user?.role === "ADMIN";
        const pastoralRes = await api.get(`/pastorals/${params.slug}`);
        const p = pastoralRes.data;

        const isCoordinatorUser = p.coordinatorIds?.includes(session?.user?.id);

        if (!isAdminUser && !isCoordinatorUser) {
          router.push(`/pastorais/${params.slug}`);
          return;
        }

        if (isAdminUser) {
          const usersRes = await api.get("/users");
          setUsers(usersRes.data);
        } else {
          setUsers(p.coordinators.map((c: any) => ({
            id: c.id,
            full_name: c.name,
            email: c.email,
            role: "COORDENADOR",
          })));
        }

        if (!hasLoaded) {
          setFormData({
            name: p.name,
            slug: p.slug,
            description: p.description || "",
            image_url: p.image_url || "",
            instagram: p.instagram || "",
            meeting_location: p.meeting_location || "",
            coordinatorIds: p.coordinatorIds || [],
          });
          setHasLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setFetching(false);
      }
    };
    if (status === "authenticated" && !hasLoaded) {
      fetchData();
    }
  }, [params.slug, status, session, router, hasLoaded]);

  if (status === "loading" || fetching) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/pastorais");
    return null;
  }

  const handleToggleCoordinator = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      coordinatorIds: prev.coordinatorIds.includes(userId)
        ? prev.coordinatorIds.filter(id => id !== userId)
        : [...prev.coordinatorIds, userId]
    }));
  };

  const handleUpdateForm = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async (submitData: any) => {
    setLoading(true);
    try {
      // Merge with current coordinatorIds from state
      const finalData = { ...submitData, coordinatorIds: formData.coordinatorIds };
      await api.patch(`/pastorals/${params.slug}`, finalData);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/pastorais/${finalData.slug}`);
        router.refresh();
      }, 2000);
    } catch (error) {
      console.error("Error updating pastoral:", error);
      alert("Erro ao atualizar pastoral.");
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-primary/10 font-body">
      <Header />
      <main className="grow relative overflow-hidden py-12 md:py-24">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href={`/pastorais/${params.slug}`} className="inline-flex items-center gap-3 text-sm font-bold text-primary hover:text-accent transition-all mb-12 group">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center group-hover:bg-accent transition-all shadow-lg shadow-primary/20">
                <ArrowLeft size={18} />
              </div>
              <span className="font-heading tracking-wide uppercase text-xs">Voltar para Detalhes</span>
            </Link>

            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-1">
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-widest mb-4">
                    <Edit3 size={12} /> Portal Administrativo
                  </div>
                  <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">Editar Pastoral</h1>
                  <p className="text-muted-foreground text-lg font-body leading-relaxed max-w-xl">
                    Atualize os dados e a identidade visual da <span className="text-foreground font-bold underline decoration-accent/30 decoration-4">{formData.name}</span>.
                  </p>
                </div>

                <PastoralEditForm 
                  slug={params.slug} 
                  initialData={formData} 
                  isAdmin={isAdmin} 
                  onSubmit={handleSubmit} 
                  loading={loading}
                />
              </div>

              <CoordinationSidebar 
                users={users} 
                coordinatorIds={formData.coordinatorIds} 
                isAdmin={isAdmin} 
                onToggle={handleToggleCoordinator} 
              />
            </div>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl border border-primary/10">
              <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="font-heading text-2xl font-bold mb-2 text-foreground">Atualizado!</h2>
              <p className="text-muted-foreground font-body">As informações foram atualizadas. Redirecionando...</p>
              <div className="mt-8 flex justify-center">
                <div className="w-16 h-1 bg-pearl rounded-full overflow-hidden">
                  <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 2, ease: "linear" }} className="w-full h-full bg-accent" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
