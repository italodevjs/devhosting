import { trpc } from "@/lib/trpc";
import { Receipt, Download, CreditCard, CheckCircle2, AlertCircle, Clock, Filter } from "lucide-react";
import { useState } from "react";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    paid: { label: "Pago", cls: "bg-green-500/10 text-green-400 border-green-500/20" },
    pending: { label: "Pendente", cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    overdue: { label: "Vencida", cls: "bg-red-500/10 text-red-400 border-red-500/20" },
    cancelled: { label: "Cancelada", cls: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
  };
  const s = map[status] ?? { label: status, cls: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${s.cls}`}>{s.label}</span>;
}

export default function InvoicesPage() {
  const { data: list = [], isLoading } = trpc.invoices.list.useQuery();
  const [filter, setFilter] = useState<"all"|"pending"|"paid"|"overdue">("all");
  const filtered = filter === "all" ? list : list.filter(i => i.status === filter);
  const totalPending = list.filter(i => i.status === "pending" || i.status === "overdue").reduce((s, i) => s + Number(i.amount), 0);

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-white flex items-center gap-2"><Receipt className="w-5 h-5 text-amber-400" /> Faturas</h1>

      {totalPending > 0 && (
        <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-300">Faturas em aberto — R$ {totalPending.toFixed(2)}</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold rounded-lg transition-colors">
            <CreditCard className="w-3.5 h-3.5" /> Pagar agora
          </button>
        </div>
      )}

      <div className="flex gap-2">
        {(["all","pending","overdue","paid"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-zinc-800 text-zinc-400 hover:text-white"}`}>
            {f === "all" ? "Todas" : f === "pending" ? "Pendentes" : f === "overdue" ? "Vencidas" : "Pagas"}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 text-center">
          <Receipt className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-sm text-zinc-400">Nenhuma fatura encontrada.</p>
        </div>
      ) : (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-zinc-800">
              <th className="text-left text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-3">Fatura</th>
              <th className="text-left text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Serviço</th>
              <th className="text-left text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Vencimento</th>
              <th className="text-right text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-3">Valor</th>
              <th className="text-center text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr></thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filtered.map(inv => (
                <tr key={inv.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-xs font-medium text-white">{inv.invoiceNumber}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5 hidden md:block">{inv.description?.substring(0,40)}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell"><span className="text-xs text-zinc-300">{inv.serviceType}</span></td>
                  <td className="px-4 py-3 hidden md:table-cell"><span className="text-xs text-zinc-300">{new Date(inv.dueAt).toLocaleDateString("pt-BR")}</span></td>
                  <td className="px-4 py-3 text-right"><span className="text-xs font-semibold text-white">R$ {Number(inv.amount).toFixed(2)}</span></td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={inv.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {(inv.status === "pending" || inv.status === "overdue") && (
                        <button className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-[10px] rounded-lg transition-colors">Pagar</button>
                      )}
                      <button className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-colors"><Download className="w-3 h-3" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
