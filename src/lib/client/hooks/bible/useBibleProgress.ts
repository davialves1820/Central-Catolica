"use client";

import { useState, useEffect } from "react";

export interface Progress {
    bookName: string;
    chapter: number;
    timestamp: number;
}

export function useBibleProgress(): Progress | null {
    const [progress, setProgress] = useState<Progress | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("bible-progress");
        if (!saved) {
            return;
        }
        try {
            const parsed = JSON.parse(saved);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setProgress(parsed);
        } catch {
            console.error("Falha ao analisar o progresso da bíblia");
        }
    }, []);

    return progress;
}