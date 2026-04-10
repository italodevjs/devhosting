import { useAuth } from "@/_core/hooks/useAuth";
import { Settings, User, Bell, Shield, Key, Save } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"profile"|"security"|"notifications">("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-white flex items-center gap-2"><Settings className="w-5 h-5 text-amber-400" /> Configurações</h1>

      <div className="flex gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl w-fit">
        {([["profile","Perfil",User],["security","Segurança",Shield],["notifications","Notificações",Bell]] as const).map(([key, label, Icon]) => (
          <button key={key} onClick={() => setTab(key)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === key ? "bg-amber-500/10 text-amber-400" : "text-zinc-400 hover:text-white"}`}>
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white">Informações do Perfil</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Nome</label>
              <input defaultValue={user?.name ?? ""} className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500/50" />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">E-mail</label>
              <input defaultValue={user?.email ?? ""} disabled className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-sm text-zinc-500 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Telefone</label>
              <input placeholder="+55 (11) 99999-9999" className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50" />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">CPF/CNPJ</label>
              <input placeholder="000.000.000-00" className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50" />
            </div>
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors">
            <Save className="w-4 h-4" /> {saved ? "Salvo!" : "Salvar Alterações"}
          </button>
        </div>
      )}

      {tab === "security" && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white">Segurança</h2>
          <div className="p-4 bg-zinc-800/50 rounded-lg flex items-start gap-3">
            <Key className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-white">Autenticação via OAuth</p>
              <p className="text-xs text-zinc-400 mt-1">Sua conta está protegida via OAuth ({user?.loginMethod ?? "OAuth"}). Não é necessário definir uma senha.</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">Autenticação em dois fatores (2FA)</p>
                <p className="text-xs text-zinc-400 mt-0.5">Adicione uma camada extra de segurança</p>
              </div>
              <button className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-medium rounded-lg transition-colors">Ativar</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">Sessões ativas</p>
                <p className="text-xs text-zinc-400 mt-0.5">Gerencie onde você está logado</p>
              </div>
              <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium rounded-lg transition-colors">Ver sessões</button>
            </div>
          </div>
        </div>
      )}

      {tab === "notifications" && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-white">Preferências de Notificação</h2>
          <div className="space-y-3">
            {[
              { label: "Faturas e cobranças", desc: "Receba alertas de vencimento e confirmações de pagamento" },
              { label: "Alertas de serviço", desc: "Notificações sobre status dos seus servidores e hospedagens" },
              { label: "Domínios expirando", desc: "Aviso 30, 15 e 7 dias antes do vencimento" },
              { label: "Tickets de suporte", desc: "Atualizações sobre seus chamados" },
              { label: "Novidades e promoções", desc: "Ofertas exclusivas e novos produtos" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={i < 4} className="sr-only peer" />
                  <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>
            ))}
          </div>
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors">
            <Save className="w-4 h-4" /> {saved ? "Salvo!" : "Salvar Preferências"}
          </button>
        </div>
      )}
    </div>
  );
}
