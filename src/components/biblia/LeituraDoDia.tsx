import { PropsLeituraDoDia } from "@/types/biblia";
import Link from "next/link";

export function LeituraDoDia({ livro, capitulo, versiculos, texto, imageUrl }: PropsLeituraDoDia) {
  const defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuBtcBNn1_jGBGNvz-hdhKegkloVBB1m7xxUnxG9VYGP2JuMRNF7UrzVnRr905eEzhFp3fBmddH0jQB06y4VR4r1xcxeCBiov4__lHtBrovKUnJc6gjrLOGou44FWSq_ejs_ULdGucx76Fz_1eYOICJ_xatRl6B64AWOtZPYYL24xvsBwD8uIbcoL64xhIRxUPH3r6hG_RlPy6HSBKHEGXU1OJVjhIjvhHq-BKiVX44HDPnzeMJPpeyZ4LWkJsR3ZYfmftpMtKIpke_7";
  
  return (
    <div className="bg-pearl rounded-3xl border border-primary/10 p-8 lg:p-14 flex flex-col justify-end relative overflow-hidden group h-full min-h-[460px]">
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 group-hover:scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('${imageUrl || defaultImage}')` }}
      />
      <div className="relative z-10">
        <span className="font-body text-xs text-primary font-bold uppercase mb-4 block tracking-[0.2em]">Leitura do Dia</span>
        <h2 className="font-heading text-4xl lg:text-6xl mb-6 font-medium text-foreground">{livro} {capitulo}, {versiculos}</h2>
        <p className="font-reading text-lg lg:text-xl mb-10 max-w-2xl text-foreground/90 leading-relaxed">
          {texto}
        </p>
        <Link
          href={`/biblia/${encodeURIComponent(livro)}/${capitulo}`}
          className="inline-flex bg-foreground text-background px-10 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-foreground/10 hover:shadow-primary/20"
        >
          Continuar Lendo
        </Link>
      </div>
    </div>
  );
}
