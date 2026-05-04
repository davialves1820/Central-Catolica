"use client";

import { useState, useMemo } from "react";
import Header from "@/components/shared/Header";
import { SLUG_TO_CAT, CAT_CONFIG } from "@/app/oracoes/constants";

import { usePrayers } from "@/lib/client/hooks/oracoes/usePrayers";
import { firstLetter } from "@/lib/client/hooks/utils/firstLetter";

import CategoryHero from "./CategoryHero";
import LetterFilter from "./LetterFilter";
import PrayerGroups from "./PrayerGroups";
import PrayerDetail from "./PrayerDetail";

export default function OracoesCategoryPage({ slug }: { slug: string }) {
    const catName = SLUG_TO_CAT[slug];
    const cfg = catName ? CAT_CONFIG[catName] : null;

    const { prayers, letters } = usePrayers(catName);

    const [activeLetter, setActiveLetter] = useState<string | null>(null);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    const visible = useMemo(() => {
        return activeLetter
            ? prayers.filter((p) => firstLetter(p.titulo) === activeLetter)
            : prayers;
    }, [prayers, activeLetter]);

    const selectedPrayer =
        selectedIdx !== null ? visible[selectedIdx] : null;

    const goNext = () =>
        setSelectedIdx((i) => (i !== null && i < visible.length - 1 ? i + 1 : i));

    const goPrev = () =>
        setSelectedIdx((i) => (i !== null && i > 0 ? i - 1 : i));

    if (!catName || !cfg) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1">
                <CategoryHero catName={catName} cfg={cfg} prayersLength={prayers.length} />

                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <LetterFilter
                        letters={letters}
                        activeLetter={activeLetter}
                        setActiveLetter={setActiveLetter}
                        cfg={cfg}
                        visible={visible}
                    />

                    <PrayerGroups
                        visible={visible}
                        setSelectedIdx={setSelectedIdx}
                        cfg={cfg}
                    />
                </div>
            </main>

            {selectedPrayer && selectedIdx !== null && (
                <PrayerDetail
                    prayer={selectedPrayer}
                    cfg={cfg}
                    onClose={() => setSelectedIdx(null)}
                    onPrev={goPrev}
                    onNext={goNext}
                    hasPrev={selectedIdx > 0}
                    hasNext={selectedIdx < visible.length - 1}
                />
            )}
        </div>
    );
}