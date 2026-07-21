import Link from "next/link";
import { getSantosDoDia } from "@/lib/server/services/santoDoDia";
import { ChevronRight } from "lucide-react";
import SantoDoDiaCard from "./SantoDoDiaCard";

export default async function SantoDoDia() {
    const santos = await getSantosDoDia();
    if (santos.length === 0) {
        return null;
    }

    return (
        <section className="px-5 md:px-16 py-12">
            {/* Section header */}
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 border-b border-[#d0c4be] pb-4">
                <div>
                    <span className="text-[12px] font-semibold text-primary uppercase tracking-[0.3em] mb-2 block">
                        Sanctus Diei
                    </span>
                    <h2 className="font-heading text-4xl text-primary">
                        {santos.length > 1 ? "Santos do Dia" : "Santo do Dia"}
                    </h2>
                </div>
                <Link
                    href="/santos"
                    className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#4d4540] hover:text-primary flex items-center gap-2 mt-4 md:mt-0 transition-colors"
                >
                    Ver todos os santos <ChevronRight size={14} />
                </Link>
            </div>

            <SantoDoDiaCard santos={santos} />
        </section>
    );
}
