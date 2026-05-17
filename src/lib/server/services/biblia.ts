import fs from 'fs/promises';
import path from 'path';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';

import { DadosBiblia, Livro } from "@/types/biblia";

const NOME_ARQUIVO_BIBLIA = 'bibliaAveMaria.json';
const CAMINHO_BIBLIA = process.cwd().endsWith('src') ? path.join(process.cwd(), 'data', NOME_ARQUIVO_BIBLIA) : path.join(process.cwd(), 'src', 'data', NOME_ARQUIVO_BIBLIA);

export const getDadosBiblia = cache(async (): Promise<DadosBiblia> => {
  const content = await fs.readFile(CAMINHO_BIBLIA, 'utf-8');
  return JSON.parse(content);
});

export async function getLivro(bookName: string): Promise<Livro | undefined> {
  const data = await getDadosBiblia();
  const allBooks = [...data.antigoTestamento, ...data.novoTestamento];
  return allBooks.find(b => b.nome.toLowerCase() === decodeURIComponent(bookName).toLowerCase(),);
}

function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

interface VersiculoFlat {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  /** Texto normalizado (sem acentos e minúsculo) para busca rápida. */
  normalizedText: string;
}

/**
 * Builds the flat verse index once and caches it in memory using next/cache's unstable_cache.
 * This is serverless-friendly, robust across multiple instances, and survives hot-reloads properly.
 */
const getIndexFlatCached = unstable_cache(
  async () => {
    const data = await getDadosBiblia();
    const index: VersiculoFlat[] = [];

    const addBooks = (books: Livro[]) => {
      for (const book of books) {
        for (const chapter of book.capitulos) {
          for (const verse of chapter.versiculos) {
            index.push({
              book: book.nome,
              chapter: chapter.capitulo,
              verse: verse.versiculo,
              text: verse.texto,
              normalizedText: normalize(verse.texto),
            });
          }
        }
      }
    };

    addBooks(data.antigoTestamento);
    addBooks(data.novoTestamento);

    return index;
  },
  ['bible-index-flat'],
  { tags: ['bible-index'] }
);

async function getIndexFlat(): Promise<VersiculoFlat[]> {
  return getIndexFlatCached();
}

export async function pesquisarBiblia(query: string): Promise<{ book: string; chapter: number; verse: number; text: string }[]> {
  const index = await getIndexFlat();
  const normalizedQuery = normalize(query);
  const results: { book: string; chapter: number; verse: number; text: string }[] = [];

  for (const verse of index) {
    if (verse.normalizedText.includes(normalizedQuery)) {
      results.push({
        book: verse.book,
        chapter: verse.chapter,
        verse: verse.verse,
        text: verse.text,
      });
      if (results.length >= 50) {
        break;
      }
    }
  }

  return results;
}