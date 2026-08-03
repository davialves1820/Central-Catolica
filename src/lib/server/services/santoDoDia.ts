import { cache } from "react";
import { getSantos } from "./santos";
import { Santo } from "@/types/santos";
import { MESES, normalizarTexto } from "@/lib/shared/calendarioSantos";

export const getSantosDoDia = cache(async (): Promise<Santo[]> => {
    const hoje = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
    );

    const dia = hoje.getDate();
    const mesIdx = hoje.getMonth();
    const mesesNormalizados = MESES.map(normalizarTexto);

    const { santos: todos } = await getSantos({ pagina: 1, porPagina: 9999 });

    return todos.filter((s) => {
        if (!s.data_festa) return false;
        // Precisa ser "D de mês" exato: um .includes() ingênuo faria "1" bater
        // com "10", "11", "21", "31" etc., trazendo santos de outros dias.
        const match = normalizarTexto(s.data_festa).match(/^(\d{1,2})\s+de\s+([a-z]+)$/);
        if (!match) return false;
        return Number(match[1]) === dia && mesesNormalizados.indexOf(match[2]) === mesIdx;
    });
});
