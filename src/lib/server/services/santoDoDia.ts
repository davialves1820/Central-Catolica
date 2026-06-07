import { cache } from "react";
import { getSantos } from "./santos";
import { Santo } from "@/types/santos";

export const getSantoDoDia = cache(async (): Promise<Santo | null> => {
    const hoje = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
    );

    const dia = hoje.getDate();
    const mes = hoje.getMonth() + 1;

    const MESES = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
    ];
    const nomeMes = MESES[mes - 1];

    const { santos: todos } = await getSantos({ pagina: 1, porPagina: 9999 });

    const santosHoje = todos.filter((s) => {
        if (!s.data_festa) return false;
        const feat = s.data_festa.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const mesNorm = nomeMes.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return feat.includes(`${dia}`) && feat.includes(mesNorm);
    });

    if (santosHoje.length > 0) {
        // Se houver múltiplos, escolhe deterministicamente pelo ano
        const idx = hoje.getFullYear() % santosHoje.length;
        return santosHoje[idx];
    }

    return null;
});