import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Server, Globe, HardDrive, Receipt, LifeBuoy, TrendingUp, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { useLocation } from "wouter";

function StatCard({ icon: Icon, label, value, sub, color = "amber", onClick }: {
  icon: any; label: string; value: string | number; sub?: string; color?: string; onClick?: () => void;
}) {
  const colors: Record<string, string> = {
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-all group ${onClick ? "cursor-pointer" : "cursor-default"}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg border ${colors[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        {onClick && <TrendingUp className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400 transition-colors" />}
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-zinc-400">{label}</p>
      {sub && <p className="text-[10px] text-zinc-600 mt-1">{sub}</p>}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string; icon: any }> = {
    running: { label: "Ativo", className: "bg-green-500/10 text-green-400 border-green-500/20", icon: CheckCircle2 },
    active: { label: "Ativo", className: "bg-green-500/10 text-green-400 border-green-500/20", icon: CheckCircle2 },
    stopped: { label: "Parado", className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20", icon: AlertCircle },
    suspended: { label: "Suspenso", className: "bg-red-500/10 text-red-400 border-red-500/20", icon: AlertCircle },
    provisioning: { label: "Provisionando", className: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Clock },
    pending: { label: "Pendente", className: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Clock },
    paid: { label: "Pago", className: "bg-green-500/10 text-green-400 border-green-500/20", icon: CheckCircle2 },
    overdue: { label: "Vencida", className: "bg-red-500/10 text-red-400 border-red-500/20", icon: AlertCircle },
    open: { label: "Aberto", className: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: LifeBuoy },
    in_progress: { label: "Em andamento", className: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Clock },
    resolved: { label: "Resolvido", className: "bg-green-500/10 text-green-400 border-green-500/20", icon: CheckCircle2 },
  };
  const s = map[status] ?? { label: status, className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20", icon: AlertCircle };
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${s.className}`}>
      <Icon className="w-2.5 h-2.5" /> {s.label}
    </span>
  );
}

export default function Overview() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { data: vpsList = [] } = trpc.vps.list.useQuery();
  const { data: hostingList = [] } = trpc.hosting.list.useQuery();
  const { data: domainsList = [] } = trpc.domains.list.useQuery();
  const { data: invoicesList = [] } = trpc.invoices.list.useQuery();
  const { data: ticketsList = [] } = trpc.tickets.list.useQuery();

  const pendingInvoices = invoicesList.filter(i => i.status === "pending" || i.status === "overdue");
  const openTickets = ticketsList.filter(t => t.status === "open" || t.status === "in_progress");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">
          Olá, {user?.name?.split(" ")[0] ?? "usuário"} 👋
        </h1>
        <p className="text-sm text-zinc-400 mt-1">Aqui está um resumo dos seus serviços.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Server} label="VPS ativos" value={vpsList.filter(v => v.status === "running").length} sub={`${vpsList.length} total`} color="amber" onClick={() => setLocation("/painel/vps")} />
        <StatCard icon={HardDrive} label="Hospedagens" value={hostingList.filter(h => h.status === "active").length} sub={`${hostingList.length} total`} color="blue" onClick={() => setLocation("/painel/hospedagem")} />
        <StatCard icon={Globe} label="Domínios" value={domainsList.filter(d => d.status === "active").length} sub={`${domainsList.length} total`} color="green" onClick={() => setLocation("/painel/dominios")} />
        <StatCard icon={Receipt} label="Faturas pendentes" value={pendingInvoices.length} sub={pendingInvoices.length > 0 ? "Requer atenção" : "Em dia"} color={pendingInvoices.length > 0 ? "red" : "green"} onClick={() => setLocation("/painel/faturas")} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* VPS recentes */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2"><Server className="w-4 h-4 text-amber-400" /> VPS</h2>
            <button onClick={() => setLocation("/painel/vps")} className="text-xs text-amber-400 hover:text-amber-300 transition-colors">Ver todos →</button>
          </div>
          {vpsList.length === 0 ? (
            <div className="text-center py-6">
              <Server className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
              <p className="text-xs text-zinc-500">Nenhum VPS contratado</p>
              <button onClick={() => window.location.href = "/#planos"} className="mt-2 text-xs text-amber-400 hover:underline">Contratar agora</button>
            </div>
          ) : (
            <div className="space-y-2">
              {vpsList.slice(0, 4).map(vps => (
                <div key={vps.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800/50 transition-colors">
                  <div>
                    <p className="text-xs font-medium text-white">{vps.name}</p>
                    <p className="text-[10px] text-zinc-500">{vps.ipAddress ?? "Provisionando..."}</p>
                  </div>
                  <StatusBadge status={vps.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Faturas recentes */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2"><Receipt className="w-4 h-4 text-amber-400" /> Faturas</h2>
            <button onClick={() => setLocation("/painel/faturas")} className="text-xs text-amber-400 hover:text-amber-300 transition-colors">Ver todas →</button>
          </div>
          {invoicesList.length === 0 ? (
            <div className="text-center py-6">
              <Receipt className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
              <p className="text-xs text-zinc-500">Nenhuma fatura encontrada</p>
            </div>
          ) : (
            <div className="space-y-2">
              {invoicesList.slice(0, 4).map(inv => (
                <div key={inv.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800/50 transition-colors">
                  <div>
                    <p className="text-xs font-medium text-white">{inv.invoiceNumber}</p>
                    <p className="text-[10px] text-zinc-500">{inv.description?.substring(0, 30) ?? inv.serviceType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-white">R$ {Number(inv.amount).toFixed(2)}</p>
                    <StatusBadge status={inv.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Domínios */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2"><Globe className="w-4 h-4 text-amber-400" /> Domínios</h2>
            <button onClick={() => setLocation("/painel/dominios")} className="text-xs text-amber-400 hover:text-amber-300 transition-colors">Ver todos →</button>
          </div>
          {domainsList.length === 0 ? (
            <div className="text-center py-6">
              <Globe className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
              <p className="text-xs text-zinc-500">Nenhum domínio registrado</p>
              <button onClick={() => setLocation("/dominios")} className="mt-2 text-xs text-amber-400 hover:underline">Registrar domínio</button>
            </div>
          ) : (
            <div className="space-y-2">
              {domainsList.slice(0, 4).map(d => (
                <div key={d.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800/50 transition-colors">
                  <div>
                    <p className="text-xs font-medium text-white">{d.domain}</p>
                    <p className="text-[10px] text-zinc-500">Expira: {new Date(d.expiresAt).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <StatusBadge status={d.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tickets */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2"><LifeBuoy className="w-4 h-4 text-amber-400" /> Suporte</h2>
            <button onClick={() => setLocation("/painel/suporte")} className="text-xs text-amber-400 hover:text-amber-300 transition-colors">Ver todos →</button>
          </div>
          {ticketsList.length === 0 ? (
            <div className="text-center py-6">
              <LifeBuoy className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
              <p className="text-xs text-zinc-500">Nenhum ticket aberto</p>
              <button onClick={() => setLocation("/painel/suporte")} className="mt-2 text-xs text-amber-400 hover:underline">Abrir chamado</button>
            </div>
          ) : (
            <div className="space-y-2">
              {ticketsList.slice(0, 4).map(t => (
                <div key={t.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800/50 transition-colors">
                  <div>
                    <p className="text-xs font-medium text-white truncate max-w-[180px]">{t.subject}</p>
                    <p className="text-[10px] text-zinc-500">{t.ticketNumber}</p>
                  </div>
                  <StatusBadge status={t.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
