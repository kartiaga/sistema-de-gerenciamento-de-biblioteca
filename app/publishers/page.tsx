"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Publisher {
  id: number;
  name: string;
  address: string;
  website: string;
  email: string;
}

export default function PublishersList() {
  const router = useRouter();
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPublishers() {
      try {
        const response = await fetch("/api/publishers");
        if (!response.ok) {
          throw new Error("Erro ao buscar a lista de editoras.");
        }
        const data = await response.json();
        setPublishers(data.publishers);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPublishers();
  }, []);

  return (
    <div className="flex-1 p-8 pt-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" title="Voltar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Gestão de Editoras
            </h2>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 pl-11">
            Controle do banco de selos e editoras cadastradas.
          </p>
        </div>

        <Link 
          href="/publishers/new"
          className="px-5 py-2.5 bg-zinc-900 dark:bg-indigo-600 hover:bg-zinc-800 dark:hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm flex items-center justify-center gap-2 sm:w-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Nova Editora
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
          ) : publishers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-500 dark:text-zinc-400">Nenhuma editora cadastrada no sistema ainda.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="pb-4 pt-2 px-4 font-semibold text-sm text-zinc-500 dark:text-zinc-400">ID</th>
                    <th className="pb-4 pt-2 px-4 font-semibold text-sm text-zinc-500 dark:text-zinc-400">Nome</th>
                    <th className="pb-4 pt-2 px-4 font-semibold text-sm text-zinc-500 dark:text-zinc-400">Endereço</th>
                    <th className="pb-4 pt-2 px-4 font-semibold text-sm text-zinc-500 dark:text-zinc-400">Website</th>
                    <th className="pb-4 pt-2 px-4 font-semibold text-sm text-zinc-500 dark:text-zinc-400">E-mail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
                  {publishers.map((pub) => (
                    <tr key={pub.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{pub.id}</td>
                      <td className="py-4 px-4 text-sm text-zinc-900 dark:text-zinc-100 font-semibold">{pub.name}</td>
                      <td className="py-4 px-4 text-sm text-zinc-600 dark:text-zinc-300">{pub.address}</td>
                      <td className="py-4 px-4 text-sm text-zinc-600 dark:text-zinc-300 font-mono">
                        <a href={pub.website} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">{pub.website}</a>
                      </td>
                      <td className="py-4 px-4 text-sm text-zinc-600 dark:text-zinc-300">{pub.email}</td>
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
