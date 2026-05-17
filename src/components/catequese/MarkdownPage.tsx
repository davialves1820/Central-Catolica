import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { ChevronLeft } from 'lucide-react';

// Extract text from React node to generate IDs
const extractText = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return children.toString();
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (React.isValidElement(children)) {
    return extractText((children.props as { children?: React.ReactNode }).children);
  }
  return '';
};

// Generate slug from text
const generateId = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export function MarkdownPage({ content, title, backHref, backLabel }: { content: string, title: string, backHref: string, backLabel: string }) {
  // Extract headings for Table of Contents
  const toc = useMemo(() => {
    const headings: { level: number; text: string; id: string }[] = [];
    // Matches '## Title' or '### Title'
    const regex = /^(##|###)\s+(.*)$/gm;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const text = match[2].trim();
      // To avoid duplicate IDs, we could append index, but usually titles are unique
      headings.push({
        level: match[1].length,
        text,
        id: generateId(text)
      });
    }
    return headings;
  }, [content]);

  return (
    <div className="bg-[#fbf9f4] text-[#1b1c19] min-h-screen">
      <div className="w-full bg-[#f5f3ee] border-b border-[#d0c4be]/20 pt-8 pb-12">
        <div className="max-w-container-max mx-auto px-margin-desktop w-full">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 font-label-sm text-on-surface-variant hover:text-primary transition-colors mb-6 group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {backLabel}
          </Link>
          <h1 className="font-headline-xl text-headline-xl text-[#000000]">{title}</h1>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-desktop py-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start relative">

          {/* Desktop Table of Contents (Sidebar) */}
          {toc.length > 0 && (
            <aside className="lg:w-80 shrink-0 lg:sticky lg:top-8 bg-[#f5f3ee] border border-[#d0c4be]/30 rounded-xl p-6 shadow-sm hidden lg:block max-h-[85vh] overflow-y-auto custom-scrollbar">
              <h4 className="font-headline-md text-xl text-[#000000] mb-4 border-b border-[#d0c4be]/30 pb-3 flex items-center">
                Nesta página
              </h4>
              <nav className="flex flex-col space-y-3">
                {toc.map((heading, i) => (
                  <a
                    key={i}
                    href={`#${heading.id}`}
                    className={`text-sm transition-colors hover:text-[#755b00] leading-snug ${heading.level === 2 ? 'font-semibold text-[#4d4540] mt-2' : 'pl-4 text-[#736a65]'
                      }`}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </aside>
          )}

          {/* Main Article Container */}
          <div className="flex-1 w-full max-w-4xl bg-[#ffffff] shadow-[0_10px_40px_-10px_rgba(201,168,76,0.15)] border border-[#c9a84c]/30 rounded-2xl p-8 md:p-16 lg:p-20 relative overflow-hidden">
            {/* Subtle decoration in corners */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#c9a84c]/20 rounded-tl-2xl m-4 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#c9a84c]/20 rounded-br-2xl m-4 pointer-events-none"></div>

            {/* Mobile Table of Contents */}
            {toc.length > 0 && (
              <details className="lg:hidden mb-12 bg-[#f5f3ee] border border-[#d0c4be]/30 rounded-xl p-6 shadow-sm group">
                <summary className="font-headline-md text-lg text-[#000000] cursor-pointer font-semibold list-none flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined mr-2 text-[#755b00]">menu_book</span>
                    Nesta página
                  </div>
                  <span className="material-symbols-outlined text-[#755b00] group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <nav className="flex flex-col space-y-3 mt-4 pt-4 border-t border-[#d0c4be]/30">
                  {toc.map((heading, i) => (
                    <a
                      key={i}
                      href={`#${heading.id}`}
                      className={`text-sm transition-colors hover:text-[#755b00] leading-snug ${heading.level === 2 ? 'font-semibold text-[#4d4540]' : 'pl-4 text-[#736a65]'
                        }`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </details>
            )}

            <article className="
              prose prose-stone lg:prose-xl max-w-none
              prose-p:font-body-lg prose-p:text-[#4d4540] prose-p:leading-relaxed prose-p:mb-6 prose-p:text-justify
              prose-a:text-[#755b00] prose-a:no-underline hover:prose-a:underline prose-a:font-semibold
              prose-strong:text-[#000000] prose-strong:font-semibold
              prose-blockquote:border-l-4 prose-blockquote:border-[#c9a84c] prose-blockquote:bg-[#fbf9f4] prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:italic prose-blockquote:text-[#584400] prose-blockquote:rounded-r-xl prose-blockquote:shadow-sm prose-blockquote:my-10
              prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:marker:text-[#c9a84c] prose-li:text-[#4d4540] prose-li:mb-2
              prose-hr:border-[#c9a84c]/30 prose-hr:my-12
              [&>p:first-of-type]:first-letter:float-left [&>p:first-of-type]:first-letter:text-7xl [&>p:first-of-type]:first-letter:font-headline-xl [&>p:first-of-type]:first-letter:text-[#755b00] [&>p:first-of-type]:first-letter:pr-4 [&>p:first-of-type]:first-letter:-mt-2 [&>p:first-of-type]:first-letter:mb-[-12px]
            ">
              <ReactMarkdown
                components={{
                  h1: ({ children, ...props }) => (
                    <h1 className="font-headline-xl text-4xl text-center mb-12 text-[#000000]" {...props}>{children}</h1>
                  ),
                  h2: ({ children, ...props }) => {
                    const text = extractText(children);
                    return <h2 id={generateId(text)} className="font-headline-lg text-3xl mt-16 mb-6 border-b border-[#d0c4be]/30 pb-4 text-[#000000] scroll-mt-[100px]" {...props}>{children}</h2>;
                  },
                  h3: ({ children, ...props }) => {
                    const text = extractText(children);
                    return <h3 id={generateId(text)} className="font-headline-md text-2xl text-[#755b00] mt-10 scroll-mt-[100px]" {...props}>{children}</h3>;
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
