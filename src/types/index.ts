// Bíblia
export type {
    Verse,
    Chapter,
    Book,
    BibleData,
    BibleReaderProps,
    ChapterPageProps,
    Theme,
    FontSize,
    ReadingMode,
    ThemeTokens,
    VerseItemProps,
    ChapterContentProps,
    ChapterHeadingProps,
    NavFooterProps,
    ReaderProgressBarProps,
    ReaderToolbarProps,
    SettingsPanelProps,
    TableOfContentsProps,
    ToolbarButtonProps,
    GoldIconBadgeProps,
    ContinueReadingLinkProps,
    ProgressInfoProps,
} from "./bible";
export { THEMES, THEME_LABELS, FONT_SIZE_MIN, FONT_SIZE_MAX, FONT_SIZE_STEP } from "./bible";

// Calendário Litúrgico
export type {
    LiturgicalDayData,
    JsonDayEntry,
    ViewMode,
    CalendarioState,
    DayCell,
    DaySidebarProps,
    DaySheetProps,
    ColorDotProps,
    CalendarioViewProps,
    CalendarioListViewProps,
    CalendarioHeaderProps,
    CalendarioGridViewProps,
} from "./calendar";
export { DOT, BADGE_BG, RANKS, getDot } from "./calendar";

// Liturgia
export type {
    Leitura,
    Salmo,
    Antifonas,
    LiturgiaDiaria,
    ReadingSectionProps,
    PsalmSectionProps,
    LiturgicalBackgroundProps,
    LiturgiaSidebarProps,
    DateSelectorProps,
    LiturgiaPageProps,
} from "./liturgia";

// Notícias
export type {
    Noticia,
    NoticiaCardProps,
    NoticiaDestaqueProps,
    CarouselNoticiasProps,
} from "./noticias";
export { FONTE_STYLE } from "./noticias";

// Orações
export type {
    Oracao,
    CategoryConfig,
    OracoesCategoryPageProps,
    CategoryHeroProps,
    LetterFilterProps,
    PrayerGroupsProps,
    PrayerDetailProps,
    OracaoPageProps,
} from "./oracao";
export { CAT_CONFIG, SLUG_TO_CAT } from "./oracao";

// Santos
export type {
    Santo,
    GetSantosOptions,
    SantosPageProps,
    PaginacaoProps,
    SantoSlugPageProps,
    SantosGridProps,
    SantoCardProps,
    SantoExternalLinkProps,
    SantosAlfabetoProps,
    SantosFiltrosProps,
    SantosSearchProps,
} from "./santos";

// Shared / UI
export type { InfoCardProps, ScheduleRowProps } from "./shared";