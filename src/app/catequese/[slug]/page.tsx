import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import Header from "@/components/shared/Header";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type Props = {
    params: Promise<{ slug: string }>;
};

const CONTEUDO_DIR = path.join(process.cwd(), "data/conteudo");

export async function generateStaticParams() {
    const files = fs.readdirSync(CONTEUDO_DIR);
    return files.map((file) => ({ slug: file.replace(".md", "") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const decoded = decodeURIComponent(slug);
    // Use the slug as title (capitalize first letter, replace hyphens/underscores)
    const title = decoded
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
        title,
        description: `Leia sobre ${title} na Central Católica.`,
    };
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const decoded = decodeURIComponent(slug);

    const filePath = path.join(CONTEUDO_DIR, `${decoded}.md`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const fileContent = fs.readFileSync(filePath, "utf8");

    const titleMatch = fileContent.match(/^#\s+(.+)$/m);
    const pageTitle = titleMatch ? titleMatch[1] : decoded.replace(/[-_]/g, " ");
    const bodyContent = titleMatch ? fileContent.replace(/^#\s+.+$/m, "").trimStart() : fileContent;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero */}
                <section
                    className="relative border-b border-border overflow-hidden"
                    style={{ background: "hsl(var(--secondary))" }}
                >
                    {/* Manuscript grid */}
                    <div
                        className="absolute inset-0 opacity-[0.025]"
                        aria-hidden="true"
                        style={{
                            backgroundImage: `
                repeating-linear-gradient(0deg,transparent,transparent 47px,hsl(var(--gold)) 47px,hsl(var(--gold)) 48px),
                repeating-linear-gradient(90deg,transparent,transparent 47px,hsl(var(--gold)) 47px,hsl(var(--gold)) 48px)
              `,
                        }}
                    />

                    <div className="relative container mx-auto px-4 py-12 max-w-3xl">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-body font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                        >
                            <ChevronLeft
                                size={15}
                                className="group-hover:-translate-x-0.5 transition-transform"
                                aria-hidden="true"
                            />
                            Início
                        </Link>

                        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
                            {pageTitle}
                        </h1>

                        {/* Gold divider */}
                        <div
                            className="mt-4 h-px w-16"
                            style={{
                                background:
                                    "linear-gradient(to right, hsl(var(--gold)/0.6), transparent)",
                            }}
                            aria-hidden="true"
                        />
                    </div>
                </section>

                {/* Content */}
                <article className="container mx-auto px-4 py-12 max-w-3xl">
                    <div
                        className="rounded-2xl border border-border p-7 md:p-10"
                        style={{ background: "hsl(var(--card))" }}
                    >
                        <div
                            className="
                prose-headings:font-heading prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
                prose-p:font-body prose-p:text-foreground/80 prose-p:leading-[1.85] prose-p:mb-4
                prose-strong:text-foreground prose-strong:font-bold
                prose-em:font-reading prose-em:text-foreground/75
                prose-a:text-primary prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-gold-light
                prose-blockquote:border-l-4 prose-blockquote:pl-5 prose-blockquote:italic
                prose-blockquote:text-muted-foreground prose-blockquote:font-reading
                prose-ul:font-body prose-ul:text-foreground/80 prose-ul:space-y-1
                prose-ol:font-body prose-ol:text-foreground/80 prose-ol:space-y-1
                prose-li:leading-relaxed
                prose-hr:border-border prose-hr:my-8
                prose-code:text-primary prose-code:font-mono prose-code:text-sm
                max-w-none
              "
                            style={{
                                fontFamily: "var(--font-reading)",
                                fontSize: "1.05rem",
                                lineHeight: "1.9",
                            }}
                        >
                            <ReactMarkdown
                                components={{
                                    // Headings with gold accent
                                    h2: ({ children }) => (
                                        <h2 className="font-heading text-2xl font-semibold text-foreground mt-10 mb-4 pb-2 border-b border-border/50">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">
                                            {children}
                                        </h3>
                                    ),
                                    // Paragraphs
                                    p: ({ children }) => (
                                        <p
                                            className="text-foreground/80 leading-[1.9] mb-5"
                                            style={{ fontFamily: "var(--font-reading)", fontSize: "1.05rem" }}
                                        >
                                            {children}
                                        </p>
                                    ),
                                    // Blockquote styled like reading sections
                                    blockquote: ({ children }) => (
                                        <blockquote
                                            className="my-6 pl-5 border-l-2 italic text-foreground/70"
                                            style={{
                                                borderColor: "hsl(var(--gold)/0.5)",
                                                fontFamily: "var(--font-reading)",
                                                fontSize: "1.08rem",
                                            }}
                                        >
                                            {children}
                                        </blockquote>
                                    ),
                                    // Links
                                    a: ({ href, children }) => (
                                        <a
                                            href={href}
                                            target={href?.startsWith("http") ? "_blank" : undefined}
                                            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className="text-primary underline underline-offset-2 hover:text-gold-light transition-colors"
                                        >
                                            {children}
                                        </a>
                                    ),
                                    // Horizontal rule as gold divider
                                    hr: () => (
                                        <div
                                            className="my-8 h-px"
                                            style={{
                                                background:
                                                    "linear-gradient(to right, transparent, hsl(var(--gold)/0.4), transparent)",
                                            }}
                                            aria-hidden="true"
                                        />
                                    ),
                                    // Lists
                                    ul: ({ children }) => (
                                        <ul className="my-4 space-y-2 font-body text-foreground/80">
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="my-4 space-y-2 font-body text-foreground/80 list-decimal list-inside">
                                            {children}
                                        </ol>
                                    ),
                                    li: ({ children }) => (
                                        <li className="flex items-start gap-2 leading-relaxed">
                                            <span
                                                className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                                                style={{ background: "hsl(var(--gold))" }}
                                                aria-hidden="true"
                                            />
                                            <span>{children}</span>
                                        </li>
                                    ),
                                    // Strong
                                    strong: ({ children }) => (
                                        <strong className="font-bold text-foreground">{children}</strong>
                                    ),
                                    // Em
                                    em: ({ children }) => (
                                        <em
                                            className="italic text-foreground/75"
                                            style={{ fontFamily: "var(--font-reading)" }}
                                        >
                                            {children}
                                        </em>
                                    ),
                                }}
                            >
                                {bodyContent}
                            </ReactMarkdown>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
}