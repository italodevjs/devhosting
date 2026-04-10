import { trpc } from "@/lib/trpc";
import { Shield, Users, Server, Globe, Receipt, LifeBuoy, TrendingUp } from "lucide-react";

function StatCard({ icon: Icon, label, value, color = "amber" }: { icon: any; label: string; value: number; color?: string }) {
  const colors: Record<string, string> = {
    amber: "bg-amber-500/10 text-amber-400",
    blue: "bg-blue-500/10 text-blue-400",
    green: "bg-green-500/10 text-green-400",
    purple: "bg-purple-500/10 text-purple-400",
    red: "bg-red-500/10 text-red-400",
  };
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${colors[color]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-zinc-400 mt-1">{label}</p>
    </div>
  );
}

export default function AdminPage() {
  const { data: users = [] } = trpc.admin.listUsers.useQuery();
  const { data: stats } = trpc.admin.stats.useQuery();
  const { data: allTickets = [] } = trpc.admin.listTickets.useQuery();

  const revenue = Number(stats?.revenue ?? 0);
  const openTickets = stats?.openTickets ?? 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Painel Admin</h1>
          <p className="text-xs text-zinc-400">Visão geral da plataforma</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Users} label="Usuários" value={users.length} color="blue" />
        <StatCard icon={Server} label="VPS ativos" value={stats?.vps ?? 0} color="amber" />
        <StatCard icon={LifeBuoy} label="Tickets abertos" value={openTickets} color={openTickets > 0 ? "red" : "green"} />
        <StatCard icon={TrendingUp} label="Receita (pago)" value={revenue} color="green" />
      </div>

      {/* Usuários recentes */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800 flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-white">Usuários</h2>
        </div>
        {users.length === 0 ? (
          <div className="p-8 text-center text-sm text-zinc-500">Nenhum usuário cadastrado ainda.</div>
        ) : (
          <table className="w-full">
            <thead><tr className="border-b border-zinc-800">
              <th className="text-left text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-2">Nome</th>
              <th className="text-left text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-2 hidden md:table-cell">E-mail</th>
              <th className="text-left text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-2 hidden md:table-cell">Cadastro</th>
              <th className="text-center text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-2">Role</th>
            </tr></thead>
            <tbody className="divide-y divide-zinc-800/50">
              {users.map((u: any) => (
                <tr key={u.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-4 py-3"><p className="text-xs font-medium text-white">{u.name}</p></td>
                  <td className="px-4 py-3 hidden md:table-cell"><p className="text-xs text-zinc-400">{u.email}</p></td>
                  <td className="px-4 py-3 hidden md:table-cell"><p className="text-xs text-zinc-400">{new Date(u.createdAt).toLocaleDateString("pt-BR")}</p></td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${u.role === "admin" ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"}`}>{u.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Tickets recentes */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800 flex items-center gap-2">
          <LifeBuoy className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-white">Tickets Recentes</h2>
        </div>
        {allTickets.length === 0 ? (
          <div className="p-8 text-center text-sm text-zinc-500">Nenhum ticket ainda.</div>
        ) : (
          <table className="w-full">
            <thead><tr className="border-b border-zinc-800">
              <th className="text-left text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-2">Ticket</th>
              <th className="text-left text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-2 hidden md:table-cell">Assunto</th>
              <th className="text-center text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-2">Status</th>
              <th className="text-center text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-4 py-2">Prioridade</th>
            </tr></thead>
            <tbody className="divide-y divide-zinc-800/50">
              {allTickets.slice(0, 10).map((t: any) => (
                <tr key={t.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-4 py-3"><p className="text-xs font-medium text-white">{t.ticketNumber}</p></td>
                  <td className="px-4 py-3 hidden md:table-cell"><p className="text-xs text-zinc-400 truncate max-w-xs">{t.subject}</p></td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${t.status === "open" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : t.status === "resolved" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"}`}>{t.status}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-[10px] font-medium ${t.priority === "urgent" ? "text-red-400" : t.priority === "high" ? "text-orange-400" : t.priority === "medium" ? "text-amber-400" : "text-zinc-400"}`}>{t.priority}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
