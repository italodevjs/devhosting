import { trpc } from "@/lib/trpc";
import { Server, Play, Square, RotateCcw, Terminal, Cpu, HardDrive, Globe, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    running: { label: "Ativo", className: "bg-green-500/10 text-green-400 border-green-500/20" },
    stopped: { label: "Parado", className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
    suspended: { label: "Suspenso", className: "bg-red-500/10 text-red-400 border-red-500/20" },
    provisioning: { label: "Provisionando", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  };
  const s = map[status] ?? { label: status, className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${s.className}`}>{s.label}</span>;
}

function UsageBar({ value, max, color = "amber" }: { value: number; max: number; color?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const colors: Record<string, string> = {
    amber: "bg-amber-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
  };
  const barColor = pct > 80 ? "bg-red-500" : pct > 60 ? "bg-amber-500" : colors[color];
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] text-zinc-400">
        <span>{value}/{max}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function VPSPage() {
  const { data: vpsList = [], isLoading, refetch } = trpc.vps.list.useQuery();
  const toggleStatus = trpc.vps.toggleStatus.useMutation({ onSuccess: () => refetch() });
  const [selected, setSelected] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-amber-400" /> Servidores VPS
          </h1>
          <p className="text-sm text-zinc-400 mt-1">{vpsList.length} servidor{vpsList.length !== 1 ? "es" : ""}</p>
        </div>
        <a href="/#planos" className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> Novo VPS
        </a>
      </div>

      {vpsList.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 text-center">
          <Server className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-base font-semibold text-white mb-2">Nenhum VPS contratado</h3>
          <p className="text-sm text-zinc-400 mb-6">Contrate um VPS e tenha controle total do seu servidor.</p>
          <a href="/#planos" className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Contratar VPS
          </a>
        </div>
      ) : (
        <div className="grid gap-4">
          {vpsList.map(vps => (
            <div
              key={vps.id}
              className={`bg-zinc-900/50 border rounded-xl p-5 transition-all cursor-pointer ${selected === vps.id ? "border-amber-500/50" : "border-zinc-800 hover:border-zinc-700"}`}
              onClick={() => setSelected(selected === vps.id ? null : vps.id as unknown as number)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${vps.status === "running" ? "bg-green-400 animate-pulse" : vps.status === "provisioning" ? "bg-amber-400 animate-pulse" : "bg-zinc-600"}`} />
                  <div>
                    <h3 className="text-sm font-semibold text-white">{vps.name}</h3>
                    <p className="text-xs text-zinc-500">{vps.ipAddress ?? "Aguardando IP..."} · {vps.os ?? "Linux"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={vps.status} />
                  <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                    {vps.status === "stopped" && (
                      <button onClick={() => toggleStatus.mutate({ id: vps.id, action: "start" })} className="p-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 transition-colors" title="Ligar"><Play className="w-3.5 h-3.5" /></button>
                    )}
                    {vps.status === "running" && (<>
                      <button onClick={() => toggleStatus.mutate({ id: vps.id, action: "restart" })} className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors" title="Reiniciar"><RotateCcw className="w-3.5 h-3.5" /></button>
                      <button onClick={() => toggleStatus.mutate({ id: vps.id, action: "stop" })} className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors" title="Desligar"><Square className="w-3.5 h-3.5" /></button>
                    </>)}
                  </div>
                  {selected === vps.id ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-500 mb-1">
                    <Cpu className="w-3 h-3" /> CPU
                  </div>
                  <p className="text-xs font-medium text-white">{vps.cpu} vCPU</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-500 mb-1">
                    <Server className="w-3 h-3" /> RAM
                  </div>
                  <p className="text-xs font-medium text-white">{vps.ramGb}GB</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-500 mb-1">
                    <HardDrive className="w-3 h-3" /> Disco
                  </div>
                  <p className="text-xs font-medium text-white">{vps.diskGb}GB NVMe</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-500 mb-1">
                    <Globe className="w-3 h-3" /> Banda
                  </div>
                  <p className="text-xs font-medium text-white">{vps.bandwidthGb}GB/mês</p>
                </div>
              </div>

              {selected === vps.id && (
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors">
                      <Terminal className="w-3 h-3" /> Console Web
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors">
                      <HardDrive className="w-3 h-3" /> Backup
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors">
                      <Globe className="w-3 h-3" /> Firewall
                    </button>
                  </div>
                  <div className="mt-3 p-3 bg-zinc-800/50 rounded-lg">
                    <p className="text-[10px] text-zinc-500 mb-1">Conectar via SSH</p>
                    <code className="text-xs text-amber-400 font-mono">ssh root@{vps.ipAddress ?? "0.0.0.0"}</code>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
