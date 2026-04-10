import { trpc } from "@/lib/trpc";
import { HardDrive, Globe, Shield, Mail, Database, Plus, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    active: { label: "Ativo", className: "bg-green-500/10 text-green-400 border-green-500/20" },
    suspended: { label: "Suspenso", className: "bg-red-500/10 text-red-400 border-red-500/20" },
    provisioning: { label: "Provisionando", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    cancelled: { label: "Cancelado", className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
  };
  const s = map[status] ?? { label: status, className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${s.className}`}>{s.label}</span>;
}

function UsageBar({ used, total, unit = "MB" }: { used: number; total: number; unit?: string }) {
  const pct = total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0;
  const barColor = pct > 80 ? "bg-red-500" : pct > 60 ? "bg-amber-500" : "bg-green-500";
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] text-zinc-400">
        <span>{used}{unit} / {total}{unit}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function HostingPage() {
  const { data: hostingList = [], isLoading } = trpc.hosting.list.useQuery();
  const [selected, setSelected] = useState<number | null>(null);

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-amber-400" /> Hospedagem
          </h1>
          <p className="text-sm text-zinc-400 mt-1">{hostingList.length} plano{hostingList.length !== 1 ? "s" : ""}</p>
        </div>
        <a href="/#planos" className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> Nova Hospedagem
        </a>
      </div>

      {hostingList.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 text-center">
          <HardDrive className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-base font-semibold text-white mb-2">Nenhuma hospedagem contratada</h3>
          <p className="text-sm text-zinc-400 mb-6">Contrate um plano de hospedagem e coloque seu site no ar.</p>
          <a href="/#planos" className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Contratar Hospedagem
          </a>
        </div>
      ) : (
        <div className="grid gap-4">
          {hostingList.map(h => (
            <div
              key={h.id}
              className={`bg-zinc-900/50 border rounded-xl p-5 transition-all cursor-pointer ${selected === h.id ? "border-amber-500/50" : "border-zinc-800 hover:border-zinc-700"}`}
              onClick={() => setSelected(selected === h.id ? null : h.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${h.status === "active" ? "bg-green-400 animate-pulse" : h.status === "provisioning" ? "bg-amber-400 animate-pulse" : "bg-zinc-600"}`} />
                  <div>
                    <h3 className="text-sm font-semibold text-white">{h.domain}</h3>
                    <p className="text-xs text-zinc-500">Plano {h.plan} · {h.username ?? "provisionando..."}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={h.status} />
                  {selected === h.id ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] text-zinc-500 mb-1">Armazenamento</p>
                  <UsageBar used={h.diskUsedMb ?? 0} total={h.diskLimitMb ?? 10240} unit="MB" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 mb-1">Banda Mensal</p>
                  <UsageBar used={Number(h.bandwidthUsedGb ?? 0)} total={h.bandwidthLimitGb ?? 100} unit="GB" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 mb-1">Banco de Dados</p>
                  <p className="text-xs font-medium text-white">{h.databases ?? 0} DBs</p>
                </div>
              </div>

              {selected === h.id && (
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="p-3 bg-zinc-800/50 rounded-lg">
                      <p className="text-[10px] text-zinc-500 mb-1">SSL</p>
                      <div className="flex items-center gap-1">
                        {h.sslActive ? (
                          <><CheckCircle2 className="w-3 h-3 text-green-400" /><span className="text-xs text-green-400">Ativo</span></>
                        ) : (
                          <><AlertCircle className="w-3 h-3 text-red-400" /><span className="text-xs text-red-400">Inativo</span></>
                        )}
                      </div>
                    </div>
                    <div className="p-3 bg-zinc-800/50 rounded-lg">
                      <p className="text-[10px] text-zinc-500 mb-1">Contas Email</p>
                      <p className="text-xs text-white">{h.emailAccounts ?? 0} contas</p>
                    </div>
                    <div className="p-3 bg-zinc-800/50 rounded-lg">
                      <p className="text-[10px] text-zinc-500 mb-1">Renova em</p>
                      <p className="text-xs text-white">{h.renewsAt ? new Date(h.renewsAt).toLocaleDateString("pt-BR") : "—"}</p>
                    </div>
                    <div className="p-3 bg-zinc-800/50 rounded-lg">
                      <p className="text-[10px] text-zinc-500 mb-1">Valor</p>
                      <p className="text-xs font-semibold text-white">R$ {Number(h.priceMonthly).toFixed(2)}/mês</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors">
                      <Globe className="w-3 h-3" /> Gerenciar DNS
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors">
                      <Shield className="w-3 h-3" /> SSL / HTTPS
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors">
                      <Mail className="w-3 h-3" /> Email
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors">
                      <Database className="w-3 h-3" /> Banco de Dados
                    </button>
                  </div>

                  {h.username && (
                    <div className="mt-3 p-3 bg-zinc-800/50 rounded-lg">
                      <p className="text-[10px] text-zinc-500 mb-1">Acesso FTP</p>
                      <code className="text-xs text-amber-400 font-mono">ftp://{h.username}@{h.domain}</code>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
