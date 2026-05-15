import Link from "next/link";
import { CONFIG_CAT } from "@/types/oracao";
import { Book, Sparkles, Droplets, List, Quote } from "lucide-react";


const sidebarIcons: Record<string, React.ReactNode> = {
  "Orações comuns": <Book className="w-5 h-5" />,
  "Orações diversas": <Sparkles className="w-5 h-5" />,
  "Comunhão": <Droplets className="w-5 h-5" />,
  "Jaculatórias": <List className="w-5 h-5" />,
};

export default function OracoesSidebar({ currentCat }: { currentCat?: string }) {
  return (
    <aside className="md:col-span-3 sticky top-24 hidden md:block">
      <nav className="flex flex-col border border-outline-variant/30 rounded-2xl overflow-hidden bg-surface-container-lowest shadow-sm">
        {Object.entries(CONFIG_CAT).map(([cat, config]) => {
          const isActive = currentCat === cat;
          return (
            <Link
              key={cat}
              href={`/oracoes/${config.slug}`}
              className={`${
                isActive
                  ? "text-primary bg-secondary/5 border-r-2 border-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low"
              } px-6 py-5 flex items-center gap-4 transition-all duration-200 group`}
            >
              <span className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110 text-outline-variant"}`}>
                {sidebarIcons[cat] || <Sparkles className="w-5 h-5" />}
              </span>
              <span className="font-label-md">{cat}</span>
            </Link>
          );
        })}
      </nav>

      {/* Daily Inspiration Card */}
      <div className="mt-8 p-8 bg-primary text-white rounded-2xl relative overflow-hidden shadow-md group">
        <div className="relative z-10">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-6">
            <Quote className="w-5 h-5 text-secondary-fixed" />
          </div>
          <p className="font-headline-sm italic leading-relaxed text-white/90 mb-6">
            &quot;A oração é o encontro da sede de Deus com a nossa sede.&quot;
          </p>
          <div className="flex items-center gap-3">
             <div className="w-6 h-[1px] bg-white/30"></div>
             <p className="font-label-sm text-white/60">Santo Agostinho</p>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute -bottom-6 -right-6 text-white/5 transform rotate-12 transition-transform group-hover:rotate-0 duration-700">
           <Sparkles size={120} />
        </div>
      </div>
    </aside>
  );
}

