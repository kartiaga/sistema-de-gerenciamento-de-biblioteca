"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishYear: number;
}

export default function BooksList() {
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
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-black font-sans p-6 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-zinc-800/50 overflow-hidden transform transition-all hover:shadow-indigo-500/10 flex flex-col">
          
          <div className="px-8 py-8 border-b border-zinc-200/50 dark:border-zinc-800/50 flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2zM12 2v20"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 tracking-tight">
                  Acervo Literário
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                  Controle do banco de livros disponíveis
                </p>
              </div>
            </div>
            
            <Link 
              href="/books"
              className="px-5 py-2.5 bg-zinc-900 dark:bg-indigo-600 hover:bg-zinc-800 dark:hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Novo Livro
            </Link>
          </div>
          
          <div className="p-8">
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
    </div>
  );
}
