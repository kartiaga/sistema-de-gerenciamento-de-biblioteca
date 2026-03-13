export default function Books() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-black font-sans p-4 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-zinc-800/50 overflow-hidden transform transition-all hover:shadow-indigo-500/10">
          <div className="px-8 py-8 border-b border-zinc-200/50 dark:border-zinc-800/50 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 tracking-tight">
              Novo Título
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
              Adicione os detalhes do acervo literário
            </p>
          </div>
          
          <form className="p-8 space-y-6">
            <div className="space-y-2 group">
              <label htmlFor="title" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                Título do Livro
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Ex: O Senhor dos Anéis"
                className="w-full px-4 py-3 bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-sm"
              />
            </div>

            <div className="space-y-2 group">
              <label htmlFor="author" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                Autor
              </label>
              <input
                type="text"
                id="author"
                name="author"
                placeholder="Ex: J.R.R. Tolkien"
                className="w-full px-4 py-3 bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2 group">
                <label htmlFor="isbn" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                  ISBN
                </label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  placeholder="978-0..."
                  className="w-full px-4 py-3 bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-sm"
                />
              </div>

              <div className="space-y-2 group">
                <label htmlFor="year" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                  Ano
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  placeholder="2024"
                  className="w-full px-4 py-3 bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-sm"
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                className="w-full relative group overflow-hidden px-4 py-3.5 bg-zinc-900 dark:bg-indigo-600 hover:bg-zinc-800 dark:hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-zinc-900/20 dark:shadow-indigo-900/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/50 dark:focus:ring-indigo-500/50 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
                    <path d="M5 12h14"/>
                    <path d="M12 5v14"/>
                  </svg>
                  Adicionar ao Acervo
                </span>
                <div className="absolute inset-0 bg-white/10 dark:bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
