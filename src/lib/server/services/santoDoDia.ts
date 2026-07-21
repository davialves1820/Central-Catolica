import { cache } from "react";
import { getSantos } from "./santos";
import { Santo } from "@/types/santos";

export const getSantosDoDia = cache(async (): Promise<Santo[]> => {
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

    return todos.filter((s) => {
        if (!s.data_festa) return false;
        const feat = s.data_festa.toLowerCase().normalize("NFD").replace(/\p{Mn}/gu, "");
        const mesNorm = nomeMes.normalize("NFD").replace(/\p{Mn}/gu, "");
        return feat.includes(`${dia}`) && feat.includes(mesNorm);
    });
});
