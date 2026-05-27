import type { FonteNoticia } from "@/config/feeds";

export type { FonteNoticia };

export interface Noticia {
    id: string;
    titulo: string;
    resumo: string;
    url: string;
    imagem?: string;
    categoria?: string;
    publicadoEm: string;
    fonte: FonteNoticia;
    fonteLabel: string;
}