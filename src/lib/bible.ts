import fs from 'fs/promises';
import path from 'path';
import { cache } from 'react';

export interface Verse {
  versiculo: number;
  texto: string;
}

export interface Chapter {
  capitulo: number;
  versiculos: Verse[];
}

export interface Book {
  nome: string;
  capitulos: Chapter[];
}

export interface BibleData {
  antigoTestamento: Book[];
  novoTestamento: Book[];
}

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
    ...data.novoTestamento.map(b => ({ nome: b.nome, testament: 'NT' }))
  ];
}

export async function getBook(bookName: string): Promise<Book | undefined> {
  const data = await getBibleData();
  const allBooks = [...data.antigoTestamento, ...data.novoTestamento];
  return allBooks.find(b => b.nome.toLowerCase() === decodeURIComponent(bookName).toLowerCase());
}

export async function getChapter(bookName: string, chapterNumber: number): Promise<Chapter | undefined> {
  const book = await getBook(bookName);
  return book?.capitulos.find(c => c.capitulo === chapterNumber);
}

export async function searchBible(query: string) {
  const data = await getBibleData();
  const results: { book: string; chapter: number; verse: number; text: string }[] = [];
  const normalizedQuery = query.toLowerCase();

  const processBooks = (books: Book[]) => {
    for (const book of books) {
      for (const chapter of book.capitulos) {
        for (const verse of chapter.versiculos) {
          if (verse.texto.toLowerCase().includes(normalizedQuery)) {
            results.push({
              book: book.nome,
              chapter: chapter.capitulo,
              verse: verse.versiculo,
              text: verse.texto
            });
            if (results.length >= 50) return; // Limit results
          }
        }
      }
    }
  };

  processBooks(data.antigoTestamento);
  if (results.length < 50) {
    processBooks(data.novoTestamento);
  }

  return results;
}
