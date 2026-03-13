"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Publishers() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      address: formData.get("address"),
      website: formData.get("website"),
      email: formData.get("email"),
    };

    try {
      const res = await fetch("/api/publishers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Ocorreu um erro ao salvar a editora.");
      }

      setMessage({ type: "success", text: result.message });
      (e.target as HTMLFormElement).reset(); // Limpa o formulário
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-black font-sans p-4 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-zinc-800/50 overflow-hidden transform transition-all hover:shadow-indigo-500/10">
          <div className="px-8 py-8 border-b border-zinc-200/50 dark:border-zinc-800/50 flex flex-col items-center text-center relative">
            <button type="button" onClick={() => router.back()} className="absolute left-6 top-6 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" title="Voltar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 tracking-tight">
              Nova Editora
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
              Adicione os detalhes da editora literária
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            
            {message && (
              <div className={`p-4 rounded-xl text-sm font-medium animate-in fade-in zoom-in-95 duration-300 ${message.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" : "bg-red-50 text-red-600 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"}`}>
                {message.text}
              </div>
            )}

            <div className="space-y-2 group">
              <label htmlFor="name" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                Nome da Editora
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Ex: Penguin Books"
                className="w-full px-4 py-3 bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-sm"
              />
            </div>

            <div className="space-y-2 group">
              <label htmlFor="address" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                Endereço
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                placeholder="Ex: 80 Strand, Londres"
                className="w-full px-4 py-3 bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2 group">
                <label htmlFor="website" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  required
                  placeholder="https://exemplo.com"
                  className="w-full px-4 py-3 bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-sm"
                />
              </div>

              <div className="space-y-2 group">
                <label htmlFor="email" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="contato@exemplo.com"
                  className="w-full px-4 py-3 bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 shadow-sm"
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative group overflow-hidden px-4 py-3.5 bg-zinc-900 dark:bg-indigo-600 hover:bg-zinc-800 dark:hover:bg-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-zinc-900/20 dark:shadow-indigo-900/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/50 dark:focus:ring-indigo-500/50 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
                        <path d="M5 12h14"/>
                        <path d="M12 5v14"/>
                      </svg>
                      Adicionar Editora
                    </>
                  )}
                </span>
                {!isLoading && <div className="absolute inset-0 bg-white/10 dark:bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
