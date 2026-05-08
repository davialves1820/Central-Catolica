import fs from 'fs/promises';
import path from 'path';
import { cache } from 'react';

import { BibleData, Book, Chapter } from "@/types";

const BIBLE_FILENAME = 'bibliaAveMaria.json';
const BIBLE_PATH = process.cwd().endsWith('src') ? path.join(process.cwd(), 'data', BIBLE_FILENAME) : path.join(process.cwd(), 'src', 'data', BIBLE_FILENAME);

export const getBibleData = cache(async (): Promise<BibleData> => {
  const content = await fs.readFile(BIBLE_PATH, 'utf-8');
  return JSON.parse(content);
});

export async function getBooks() {
  const data = await getBibleData();
  return [
    ...data.antigoTestamento.map(b => ({ nome: b.nome, testament: 'AT' })),
    ...data.novoTestamento.map(b => ({ nome: b.nome, testament: 'NT' })),
  ];
}

export async function getBook(bookName: string): Promise<Book | undefined> {
  const data = await getBibleData();
  const allBooks = [...data.antigoTestamento, ...data.novoTestamento];
  return allBooks.find(b => b.nome.toLowerCase() === decodeURIComponent(bookName).toLowerCase(),);
}

export async function getChapter(bookName: string, chapterNumber: number): Promise<Chapter | undefined> {
  const book = await getBook(bookName);
  return book?.capitulos.find(c => c.capitulo === chapterNumber);
}

function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

interface FlatVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  /** Pre-computed accent-normalized + lowercased text for fast matching. */
  normalizedText: string;
}

const globalForBible = globalThis as unknown as {
  bibleIndexCache?: FlatVerse[];
};

/**
 * Builds the flat verse index once and caches it in memory.
 * We use globalThis so it survives hot-reloads during development.
 */
async function getFlatIndex(): Promise<FlatVerse[]> {
  if (globalForBible.bibleIndexCache) {
    return globalForBible.bibleIndexCache;
  }

  const data = await getBibleData();
  const index: FlatVerse[] = [];

  const addBooks = (books: Book[]) => {
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

  globalForBible.bibleIndexCache = index;
  return index;
}

export async function searchBible(query: string): Promise<{ book: string; chapter: number; verse: number; text: string }[]> {
  const index = await getFlatIndex();
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