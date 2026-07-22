import { cache } from "react";
import { getSantos } from "./santos";
import { CalendarioSantos } from "@/types/santos";
import { MESES, DIAS_NO_MES, normalizarTexto, chaveDia } from "@/lib/shared/calendarioSantos";

/** Constrói o índice "MM-DD" -> santos, a partir do texto livre de data_festa (ex: "25 de julho"). */
export const getCalendarioSantos = cache(async (): Promise<CalendarioSantos> => {
    const { santos: todos } = await getSantos({ pagina: 1, porPagina: 9999 });

    const mesesNormalizados = MESES.map(normalizarTexto);
    const calendario: CalendarioSantos = {};

    for (const santo of todos) {
        if (!santo.data_festa) continue;

        const match = normalizarTexto(santo.data_festa).match(/^(\d{1,2})\s+de\s+([a-z]+)$/);
        if (!match) continue;

        const dia = Number(match[1]);
        const mesIdx = mesesNormalizados.indexOf(match[2]);
        if (mesIdx === -1 || dia < 1 || dia > DIAS_NO_MES[mesIdx]) continue;

        const chave = chaveDia(mesIdx + 1, dia);
        (calendario[chave] ??= []).push({
            nome: santo.nome,
            slug: santo.slug,
            tipo: santo.tipo,
            imagem_url: santo.imagem_url,
            data_festa: santo.data_festa,
            padroeiro_de: santo.padroeiro_de,
        });
    }

    return calendario;
});
