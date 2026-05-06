export interface Oracao {
    titulo: string;
    slug: string;
    url: string;
    categoria: string;
    texto: string;
}

export interface CategoryConfig {
    emoji: string;
    desc: string;
    color: string;
    border: string;
    glow: string;
    slug: string;
}

export const CAT_CONFIG: Record<string, CategoryConfig> = {
    "Orações comuns": {
        slug: "oracoes-comuns",
        emoji: "✝️",
        desc: "As orações fundamentais da vida cristã",
        color: "hsl(42,89%,42%)",
        border: "hsl(42,89%,42%,0.35)",
        glow: "hsl(42,89%,42%,0.08)",
    },
    "Orações diversas": {
        slug: "oracoes-diversas",
        emoji: "🕊️",
        desc: "Súplicas e preces para diversas intenções",
        color: "hsl(214,52%,58%)",
        border: "hsl(214,58%,41%,0.3)",
        glow: "hsl(214,58%,41%,0.06)",
    },
    "Comunhão": {
        slug: "comunhao",
        emoji: "🧎",
        desc: "Orações antes e depois da Sagrada Comunhão",
        color: "hsl(0,60%,44%)",
        border: "hsl(0,68%,32%,0.3)",
        glow: "hsl(0,68%,32%,0.06)",
    },
    "Jaculatórias": {
        slug: "jaculatorias",
        emoji: "⭐",
        desc: "Breves invocações e aspirações do coração",
        color: "hsl(40,70%,60%)",
        border: "hsl(40,70%,60%,0.35)",
        glow: "hsl(40,70%,60%,0.08)",
    },
};

export const SLUG_TO_CAT: Record<string, string> = Object.fromEntries(
    Object.entries(CAT_CONFIG).map(([cat, v]) => [v.slug, cat]),
);

export interface OracoesCategoryPageProps {
    slug: string;
}

export interface CategoryHeroProps {
    catName: string;
    cfg: CategoryConfig;
    prayersLength: number;
}

export interface LetterFilterProps {
    letters: string[];
    activeLetter: string | null;
    setActiveLetter: (letter: string | null) => void;
    cfg: CategoryConfig;
    visible: Oracao[];
}

export interface PrayerGroupsProps {
    visible: Oracao[];
    setSelectedIdx: (idx: number | ((prev: number | null) => number | null)) => void;
    cfg: CategoryConfig;
}

export interface PrayerDetailProps {
    prayer: Oracao;
    cfg: CategoryConfig;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    hasPrev: boolean;
    hasNext: boolean;
}

export interface OracaoPageProps {
    params: Promise<{ slug: string }>;
}