import { Cross, HeartHandshake, Flame, Calendar, Users, type LucideIcon } from "lucide-react";

export interface ItemRecurso {
  href: string;
  icone: LucideIcon;
  titulo: string;
  descricao: string;
}

/** Ferramentas devocionais e páginas de referência agrupadas em /recursos e no menu do Header. */
export const RECURSOS: ItemRecurso[] = [
  {
    href: "/rosario",
    icone: Cross,
    titulo: "Rosário",
    descricao: "Reze o terço oração por oração, com os mistérios do dia.",
  },
  {
    href: "/confissao",
    icone: HeartHandshake,
    titulo: "Confissão",
    descricao: "Exame de consciência para se preparar para a Reconciliação.",
  },
  {
    href: "/catequese",
    icone: Flame,
    titulo: "Catequese",
    descricao: "Artigos sobre os sacramentos e a doutrina da Igreja.",
  },
  {
    href: "/calendario",
    icone: Calendar,
    titulo: "Calendário",
    descricao: "O calendário litúrgico do ano, com festas e celebrações.",
  },
  {
    href: "/santos",
    icone: Users,
    titulo: "Santos",
    descricao: "Santoral e hagiografia: vida e padroeiros dos santos.",
  },
];
