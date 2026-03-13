import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-black font-sans p-6 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-zinc-800/50 p-10 flex flex-col items-center text-center">
          
          <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/50 rounded-3xl flex items-center justify-center mb-8 text-indigo-600 dark:text-indigo-400 shadow-inner group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 tracking-tight mb-4 leading-tight">
            Sistema de Gerenciamento <br/>
            <span className="text-indigo-600 dark:text-indigo-400">de Biblioteca</span>
          </h1>
          
          <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-10 max-w-lg mx-auto font-medium">
            Escolha o que você deseja fazer hoje. Gerencie os detalhes do seu acervo de livros com facilidade ou registre novas obras literárias!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <Link 
              href="/books/new"
              className="group relative overflow-hidden p-6 bg-white/50 dark:bg-zinc-950/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col items-center text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Cadastrar Livro
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Adicione uma nova obra ao acervo da biblioteca
              </p>
              
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>

            <Link 
              href="/books"
              className="group relative overflow-hidden p-6 bg-white/50 dark:bg-zinc-950/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 flex flex-col items-center text-center focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            >
              <div className="w-12 h-12 bg-sky-50 dark:bg-sky-500/10 rounded-xl flex items-center justify-center mb-4 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="7" height="7" x="3" y="3" rx="1"/>
                  <rect width="7" height="7" x="14" y="3" rx="1"/>
                  <rect width="7" height="7" x="14" y="14" rx="1"/>
                  <rect width="7" height="7" x="3" y="14" rx="1"/>
                </svg>
              </div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Ver Acervo
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Visualize e gerencie todos os livros registrados
              </p>
              
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
