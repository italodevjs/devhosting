import { trpc } from "@/lib/trpc";
import { Globe, Plus, RefreshCw, Settings, Shield, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    active: { label: "Ativo", className: "bg-green-500/10 text-green-400 border-green-500/20" },
    expired: { label: "Expirado", className: "bg-red-500/10 text-red-400 border-red-500/20" },
    pending_transfer: { label: "Transferindo", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    suspended: { label: "Suspenso", className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
  };
  const s = map[status] ?? { label: status, className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${s.className}`}>{s.label}</span>;
}

function daysUntil(date: Date | string) {
  return Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export default function DomainsPage() {
  const { data: domainsList = [], isLoading } = trpc.domains.list.useQuery();
  const [selected, setSelected] = useState<number | null>(null);

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2"><Globe className="w-5 h-5 text-amber-400" /> Domínios</h1>
          <p className="text-sm text-zinc-400 mt-1">{domainsList.length} domínio{domainsList.length !== 1 ? "s" : ""}</p>
        </div>
        <a href="/dominios" className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors">
          <Plus className="w-4 h-4" /> Registrar Domínio
        </a>
      </div>

      {domainsList.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 text-center">
          <Globe className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-base font-semibold text-white mb-2">Nenhum domínio registrado</h3>
          <p className="text-sm text-zinc-400 mb-6">Registre seu domínio e construa sua presença online.</p>
          <a href="/dominios" className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Buscar Domínio
          </a>
        </div>
      ) : (
        <div className="grid gap-3">
          {domainsList.map(d => {
            const days = daysUntil(d.expiresAt);
            const expiringSoon = days <= 30 && days > 0;
            const expired = days <= 0;
            return (
              <div key={d.id} className={`bg-zinc-900/50 border rounded-xl p-4 transition-all cursor-pointer ${selected === d.id ? "border-amber-500/50" : expired ? "border-red-500/30" : expiringSoon ? "border-amber-500/30" : "border-zinc-800 hover:border-zinc-700"}`} onClick={() => setSelected(selected === d.id ? null : d.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${expired ? "bg-red-500/10" : "bg-amber-500/10"}`}>
                      <Globe className={`w-4 h-4 ${expired ? "text-red-400" : "text-amber-400"}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{d.domain}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-zinc-500">{expired ? "Expirado em" : "Expira em"}: {new Date(d.expiresAt).toLocaleDateString("pt-BR")}</span>
                        {expiringSoon && !expired && <span className="text-[10px] text-amber-400 font-medium">({days} dias)</span>}
                        {expired && <span className="text-[10px] text-red-400 font-medium">Renovação necessária</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={d.status} />
                    {selected === d.id ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
                  </div>
                </div>

                {selected === d.id && (
                  <div className="mt-4 pt-4 border-t border-zinc-800">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="p-3 bg-zinc-800/50 rounded-lg">
                        <p className="text-[10px] text-zinc-500 mb-1">Auto-renovação</p>
                        {d.autoRenew ? <><CheckCircle2 className="w-3 h-3 text-green-400 inline mr-1" /><span className="text-xs text-green-400">Ativa</span></> : <><AlertCircle className="w-3 h-3 text-zinc-500 inline mr-1" /><span className="text-xs text-zinc-500">Inativa</span></>}
                      </div>
                      <div className="p-3 bg-zinc-800/50 rounded-lg">
                        <p className="text-[10px] text-zinc-500 mb-1">Proteção WHOIS</p>
                        {d.privacyProtection ? <><Shield className="w-3 h-3 text-green-400 inline mr-1" /><span className="text-xs text-green-400">Ativa</span></> : <><AlertCircle className="w-3 h-3 text-zinc-500 inline mr-1" /><span className="text-xs text-zinc-500">Inativa</span></>}
                      </div>
                      <div className="p-3 bg-zinc-800/50 rounded-lg">
                        <p className="text-[10px] text-zinc-500 mb-1">Registrar</p>
                        <p className="text-xs text-white">DevHosting</p>
                      </div>
                      <div className="p-3 bg-zinc-800/50 rounded-lg">
                        <p className="text-[10px] text-zinc-500 mb-1">Nameserver</p>
                        <p className="text-xs text-white truncate">{Array.isArray(d.nameservers) && d.nameservers.length > 0 ? d.nameservers[0] : "ns1.devhosting.com.br"}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors"><Settings className="w-3 h-3" /> Gerenciar DNS</button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors"><RefreshCw className="w-3 h-3" /> Renovar</button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs rounded-lg transition-colors"><Shield className="w-3 h-3" /> Proteção WHOIS</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
