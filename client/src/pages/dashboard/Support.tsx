import { trpc } from "@/lib/trpc";
import { LifeBuoy, Plus, MessageSquare, X } from "lucide-react";
import { useState } from "react";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    open: { label: "Aberto", cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    in_progress: { label: "Em andamento", cls: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    resolved: { label: "Resolvido", cls: "bg-green-500/10 text-green-400 border-green-500/20" },
    closed: { label: "Fechado", cls: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
  };
  const s = map[status] ?? { label: status, cls: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${s.cls}`}>{s.label}</span>;
}

export default function SupportPage() {
  const { data: tickets = [], isLoading, refetch } = trpc.tickets.list.useQuery();
  const createTicket = trpc.tickets.create.useMutation({
    onSuccess: () => { refetch(); setShowForm(false); setForm({ subject: "", message: "", priority: "medium", category: "technical" }); }
  });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<{
    subject: string;
    message: string;
    priority: "low" | "medium" | "high" | "critical";
    category: "billing" | "technical" | "domain" | "vps" | "hosting" | "other";
  }>({ subject: "", message: "", priority: "medium", category: "technical" });

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white flex items-center gap-2"><LifeBuoy className="w-5 h-5 text-amber-400" /> Suporte</h1>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors">
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? "Cancelar" : "Novo Ticket"}
        </button>
      </div>

      {showForm && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-white">Abrir novo chamado</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Assunto *</label>
              <input value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} placeholder="Descreva o problema" className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Prioridade</label>
                <select value={form.priority} onChange={e => setForm(f => ({...f, priority: e.target.value as "low" | "medium" | "high" | "critical"}))} className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500/50">
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                  <option value="critical">Crítico</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Categoria</label>
                <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value as "billing" | "technical" | "domain" | "vps" | "hosting" | "other"}))} className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500/50">
                  <option value="technical">Técnico</option>
                  <option value="billing">Financeiro</option>
                  <option value="domain">Domínio</option>
                  <option value="other">Outro</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Mensagem *</label>
            <textarea value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} placeholder="Descreva o problema em detalhes..." rows={4} className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 resize-none" />
          </div>
          <button onClick={() => createTicket.mutate(form)} disabled={!form.subject || !form.message || createTicket.isPending} className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-sm font-semibold rounded-lg transition-colors">
            {createTicket.isPending ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <Plus className="w-4 h-4" />}
            Enviar Ticket
          </button>
        </div>
      )}

      {tickets.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 text-center">
          <LifeBuoy className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-base font-semibold text-white mb-2">Nenhum ticket aberto</h3>
          <p className="text-sm text-zinc-400 mb-6">Precisa de ajuda? Nossa equipe responde em até 2h.</p>
          <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Abrir Chamado
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map(t => (
            <div key={t.id} className="bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 transition-all cursor-pointer">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.subject}</p>
                    <p className="text-[10px] text-zinc-500 mt-1">{t.ticketNumber} · {new Date(t.createdAt).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
                <StatusBadge status={t.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
