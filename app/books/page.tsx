"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishYear: number;
}

export default function BooksList() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/books");
        if (!response.ok) {
          throw new Error("Erro ao buscar a lista de livros.");
        }
        const data = await response.json();
        setBooks(data.books);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div className="flex-1 p-8 pt-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Gestão do Acervo
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Controle do banco de livros disponíveis na biblioteca.
          </p>
        </div>

        <Link 
          href="/books/new"
          className="px-5 py-2.5 bg-zinc-900 dark:bg-indigo-600 hover:bg-zinc-800 dark:hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm flex items-center justify-center gap-2 sm:w-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Novo Livro
        </Link>
      </div>

      <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="p-6">
          {error ? (
            <div className="p-4 bg-red-50 text-red-600 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20 rounded-xl font-medium text-center">
              {error}
            </div>
          ) : isLoading ? (
            <div className="w-full flex justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-500 dark:text-zinc-400">Nenhum livro cadastrado no sistema ainda.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="pb-4 pt-2 px-4 font-semibold text-sm text-zinc-500 dark:text-zinc-400">ID</th>
                    <th className="pb-4 pt-2 px-4 font-semibold text-sm text-zinc-500 dark:text-zinc-400">Título</th>
                    <th className="pb-4 pt-2 px-4 font-semibold text-sm text-zinc-500 dark:text-zinc-400">Autor</th>
                    <th className="pb-4 pt-2 px-4 font-semibold text-sm text-zinc-500 dark:text-zinc-400">ISBN</th>
                    <th className="pb-4 pt-2 px-4 font-semibold text-sm text-zinc-500 dark:text-zinc-400 text-right">Ano</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
                  {books.map((book) => (
                    <tr key={book.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{book.id}</td>
                      <td className="py-4 px-4 text-sm text-zinc-900 dark:text-zinc-100 font-semibold">{book.title}</td>
                      <td className="py-4 px-4 text-sm text-zinc-600 dark:text-zinc-300">{book.author}</td>
                      <td className="py-4 px-4 text-sm text-zinc-600 dark:text-zinc-300 font-mono">{book.isbn}</td>
                      <td className="py-4 px-4 text-sm text-zinc-600 dark:text-zinc-300 text-right">{book.publishYear}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
