"use client";

import { useEffect, useRef, useState } from "react";

interface Publisher {
  id: number;
  name: string;
  address: string;
  website: string;
  email: string;
}

export default function PublishersList() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Edit Modal State
  const [editingPublisher, setEditingPublisher] = useState<Publisher | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Create Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createMessage, setCreateMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const createFormRef = useRef<HTMLFormElement>(null);

  // Actions Menu State
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; right: number }>({ top: 0, right: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    if (openMenuId !== null) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openMenuId]);

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

  const handleDelete = async (id: number) => {
    if (!window.confirm("Você tem certeza que deseja deletar esta editora?")) {
      return;
    }

    try {
      const response = await fetch(`/api/publishers?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar a editora.");
      }

      setPublishers((prev) => prev.filter((p) => p.id !== id));
      alert("Editora deletada com sucesso!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const submitCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);
    setCreateMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      website: formData.get("website") as string,
      email: formData.get("email") as string,
    };

    try {
      const response = await fetch("/api/publishers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ocorreu um erro ao salvar a editora.");
      }

      setCreateMessage({ type: "success", text: result.message });
      createFormRef.current?.reset();

      setPublishers((prev) => [
        { id: result.publisher.id, ...data },
        ...prev,
      ]);

      setTimeout(() => {
        setIsCreateOpen(false);
        setCreateMessage(null);
      }, 1500);
    } catch (err: any) {
      setCreateMessage({ type: "error", text: err.message });
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdate = (publisher: Publisher) => {
    setUpdateMessage(null);
    setEditingPublisher(publisher);
  };

  const submitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingPublisher) return;

    setIsUpdating(true);
    setUpdateMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      address: formData.get("address"),
      website: formData.get("website"),
      email: formData.get("email"),
    };

    try {
      const response = await fetch(`/api/publishers?id=${editingPublisher.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao atualizar a editora.");
      }

      setPublishers((prev) =>
        prev.map((p) =>
          p.id === editingPublisher.id
            ? {
                ...p,
                name: data.name as string,
                address: data.address as string,
                website: data.website as string,
                email: data.email as string,
              }
            : p
        )
      );

      setUpdateMessage({ type: "success", text: "Editora atualizada com sucesso!" });
      setTimeout(() => {
        setEditingPublisher(null);
      }, 1500);
    } catch (err: any) {
      setUpdateMessage({ type: "error", text: err.message });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex-1 p-8 pt-6 relative">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Gestão de Editoras
            </h2>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Controle do banco de selos e editoras cadastradas.
          </p>
        </div>

        <button
          onClick={() => { setCreateMessage(null); setIsCreateOpen(true); }}
          className="px-5 py-2.5 bg-zinc-900 dark:bg-indigo-600 hover:bg-zinc-800 dark:hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm flex items-center justify-center gap-2 sm:w-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Nova Editora
        </button>
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
                    <th className="pb-4 pt-2 px-4 font-semibold text-sm text-zinc-500 dark:text-zinc-400 text-center w-16">Ações</th>
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
                      <td className="py-4 px-4 text-sm text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                            setMenuPos({
                              top: rect.bottom + 6,
                              right: window.innerWidth - rect.right,
                            });
                            setOpenMenuId(openMenuId === pub.id ? null : pub.id);
                          }}
                          className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors inline-flex items-center justify-center"
                          title="Ações"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="5" r="1.5"/>
                            <circle cx="12" cy="12" r="1.5"/>
                            <circle cx="12" cy="19" r="1.5"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Actions Dropdown — rendered outside the table to escape overflow:hidden */}
      {openMenuId !== null && (() => {
        const pub = publishers.find((p) => p.id === openMenuId);
        if (!pub) return null;
        return (
          <div
            ref={menuRef}
            style={{ position: "fixed", top: menuPos.top, right: menuPos.right, zIndex: 9999 }}
            className="w-44 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-700 py-1 overflow-hidden"
          >
            <button
              onClick={() => { setOpenMenuId(null); handleUpdate(pub); }}
              className="w-full text-left px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-3 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500 shrink-0">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Editar
            </button>
            <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />
            <button
              onClick={() => { setOpenMenuId(null); handleDelete(pub.id); }}
              className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-3 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
              Deletar
            </button>
          </div>
        );
      })()}

      {/* Create Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-zinc-950 w-full max-w-md rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Nova Editora
              </h3>
              <button
                onClick={() => { setIsCreateOpen(false); setCreateMessage(null); }}
                className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form ref={createFormRef} onSubmit={submitCreate} className="p-6 space-y-5 flex flex-col max-h-[80vh] overflow-y-auto">
              {createMessage && (
                <div className={`p-4 rounded-xl text-sm font-medium ${createMessage.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" : "bg-red-50 text-red-600 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"}`}>
                  {createMessage.text}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="new-name" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Nome da Editora</label>
                <input type="text" id="new-name" name="name" required placeholder="Ex: Penguin Books"
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
              </div>

              <div className="space-y-2">
                <label htmlFor="new-address" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Endereço</label>
                <input type="text" id="new-address" name="address" required placeholder="Ex: 80 Strand, Londres"
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="new-website" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">Website</label>
                  <input type="url" id="new-website" name="website" required placeholder="https://exemplo.com"
                    className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-email" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">E-mail</label>
                  <input type="email" id="new-email" name="email" required placeholder="contato@exemplo.com"
                    className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => { setIsCreateOpen(false); setCreateMessage(null); }}
                  className="flex-1 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500/50">
                  Cancelar
                </button>
                <button type="submit" disabled={isCreating}
                  className="flex-1 relative group px-4 py-3 bg-zinc-900 dark:bg-indigo-600 hover:bg-zinc-800 dark:hover:bg-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                  <span className="flex items-center justify-center gap-2">
                    {isCreating ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Salvando...
                      </>
                    ) : "Adicionar Editora"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}

      {editingPublisher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-zinc-950 w-full max-w-md rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Editar Editora
              </h3>
              <button 
                onClick={() => setEditingPublisher(null)}
                className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <form onSubmit={submitUpdate} className="p-6 space-y-5 flex flex-col max-h-[80vh] overflow-y-auto">
              {updateMessage && (
                <div className={`p-4 rounded-xl text-sm font-medium ${updateMessage.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" : "bg-red-50 text-red-600 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20"}`}>
                  {updateMessage.text}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Nome da Editora
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  defaultValue={editingPublisher.name}
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Endereço
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  defaultValue={editingPublisher.address}
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="website" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  required
                  defaultValue={editingPublisher.website}
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  defaultValue={editingPublisher.email}
                  className="w-full px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPublisher(null)}
                  className="flex-1 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 relative group px-4 py-3 bg-zinc-900 dark:bg-indigo-600 hover:bg-zinc-800 dark:hover:bg-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isUpdating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Salvando...
                      </>
                    ) : (
                      "Salvar Alterações"
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
