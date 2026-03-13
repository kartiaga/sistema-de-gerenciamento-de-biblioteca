import Link from "next/link";
import { Book, PlusCircle, Building2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 p-8 pt-6">
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Painel Administrativo
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Gestão do acervo literário e administração do sistema.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <Link href="/books" className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm transition-all hover:shadow-md hover:border-indigo-500/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 transition-colors">
              Acervo de Livros
            </h3>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
              <Book className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Visualize e faça a gestão do catálogo de livros salvos no banco.
          </p>
        </Link>
        
        {/* Card 2 */}
        <Link href="/publishers" className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm transition-all hover:shadow-md hover:border-amber-500/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 transition-colors">
              Editoras
            </h3>
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg text-amber-600 dark:text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Gerencie o cadastro de selos e editoras na sua rede administrativa.
          </p>
        </Link>

      </div>
      
    </div>
  );
}

