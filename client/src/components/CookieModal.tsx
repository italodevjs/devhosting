/* DevHosting — CookieModal
   Modal de preferências de cookies detalhado estilo Hostinger
   Com 4 categorias, toggles, descrições e lista de cookies por categoria */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, BarChart2, Megaphone, Settings2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useCookies, CookiePreferences } from "../context/CookieContext";

interface CategoryInfo {
  id: keyof CookiePreferences;
  icon: React.ReactNode;
  title: string;
  description: string;
  required: boolean;
  cookies: { name: string; provider: string; purpose: string; duration: string }[];
}

const CATEGORIES: CategoryInfo[] = [
  {
    id: "essential",
    icon: <Shield className="w-5 h-5 text-green-400" />,
    title: "Cookies Essenciais",
    description:
      "Esses cookies são necessários para o funcionamento básico do site. Sem eles, serviços como login, carrinho e segurança não funcionam. Não podem ser desativados.",
    required: true,
    cookies: [
      { name: "devhosting_session", provider: "DevHosting", purpose: "Mantém a sessão do usuário autenticado", duration: "Sessão" },
      { name: "devhosting_cookie_consent_v2", provider: "DevHosting", purpose: "Armazena suas preferências de cookies", duration: "1 ano" },
      { name: "devhosting_promo_dismissed_v1", provider: "DevHosting", purpose: "Lembra se o banner de oferta foi fechado", duration: "30 dias" },
      { name: "csrf_token", provider: "DevHosting", purpose: "Proteção contra ataques CSRF", duration: "Sessão" },
      { name: "__stripe_mid", provider: "Stripe", purpose: "Prevenção de fraudes em pagamentos", duration: "1 ano" },
      { name: "__stripe_sid", provider: "Stripe", purpose: "Sessão de pagamento segura", duration: "30 min" },
    ],
  },
  {
    id: "functional",
    icon: <Settings2 className="w-5 h-5 text-blue-400" />,
    title: "Cookies Funcionais",
    description:
      "Permitem que o site lembre suas preferências, como idioma, moeda e configurações de exibição. Melhoram sua experiência sem rastrear você.",
    required: false,
    cookies: [
      { name: "devhosting_lang", provider: "DevHosting", purpose: "Salva o idioma selecionado (PT/EN/ES/RU)", duration: "1 ano" },
      { name: "devhosting_currency", provider: "DevHosting", purpose: "Salva a moeda preferida", duration: "1 ano" },
      { name: "devhosting_theme", provider: "DevHosting", purpose: "Salva o tema (dark/light)", duration: "1 ano" },
      { name: "devhosting_cart", provider: "DevHosting", purpose: "Mantém itens no carrinho de domínios", duration: "7 dias" },
      { name: "intercom-session-*", provider: "Intercom", purpose: "Mantém o contexto do chat de suporte", duration: "Sessão" },
    ],
  },
  {
    id: "analytics",
    icon: <BarChart2 className="w-5 h-5 text-amber-400" />,
    title: "Cookies Analíticos",
    description:
      "Coletam informações sobre como você usa o site — páginas visitadas, tempo de permanência e erros. Os dados são anonimizados e usados para melhorar o serviço.",
    required: false,
    cookies: [
      { name: "_ga", provider: "Google Analytics", purpose: "Distingue usuários únicos", duration: "2 anos" },
      { name: "_ga_*", provider: "Google Analytics", purpose: "Armazena estado da sessão", duration: "2 anos" },
      { name: "_gid", provider: "Google Analytics", purpose: "Distingue usuários (24h)", duration: "24 horas" },
      { name: "_gat", provider: "Google Analytics", purpose: "Limita taxa de requisições", duration: "1 minuto" },
      { name: "hotjar_*", provider: "Hotjar", purpose: "Mapas de calor e gravação de sessão anonimizada", duration: "1 ano" },
      { name: "_hjSessionUser_*", provider: "Hotjar", purpose: "Identifica sessão de usuário anonimamente", duration: "1 ano" },
    ],
  },
  {
    id: "marketing",
    icon: <Megaphone className="w-5 h-5 text-purple-400" />,
    title: "Cookies de Marketing",
    description:
      "Usados para exibir anúncios relevantes para você em outros sites. Também permitem medir a eficácia das nossas campanhas publicitárias.",
    required: false,
    cookies: [
      { name: "_fbp", provider: "Meta (Facebook)", purpose: "Rastreamento de conversões do Facebook Ads", duration: "3 meses" },
      { name: "fr", provider: "Meta (Facebook)", purpose: "Entrega de anúncios relevantes", duration: "3 meses" },
      { name: "_gcl_au", provider: "Google Ads", purpose: "Rastreamento de conversões do Google Ads", duration: "3 meses" },
      { name: "IDE", provider: "Google DoubleClick", purpose: "Anúncios personalizados na Rede Display", duration: "1 ano" },
      { name: "tt_webid_*", provider: "TikTok", purpose: "Rastreamento de conversões do TikTok Ads", duration: "1 ano" },
      { name: "li_fat_id", provider: "LinkedIn", purpose: "Rastreamento de conversões do LinkedIn Ads", duration: "30 dias" },
    ],
  },
];

export default function CookieModal() {
  const { showModal, closeModal, consent, acceptAll, declineAll, saveCustom } = useCookies();
  const [expanded, setExpanded] = useState<string | null>("essential");
  const [prefs, setPrefs] = useState({
    essential: true,
    functional: consent.preferences.functional,
    analytics: consent.preferences.analytics,
    marketing: consent.preferences.marketing,
  });

  // Sincronizar com preferências salvas ao abrir
  useEffect(() => {
    if (showModal) {
      setPrefs({
        essential: true,
        functional: consent.preferences.functional,
        analytics: consent.preferences.analytics,
        marketing: consent.preferences.marketing,
      });
    }
  }, [showModal, consent.preferences]);

  const toggle = (id: keyof typeof prefs) => {
    if (id === "essential") return;
    setPrefs((p) => ({ ...p, [id]: !p[id] }));
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const handleAcceptAll = () => {
    setPrefs({ essential: true, functional: true, analytics: true, marketing: true });
    acceptAll();
  };

  const handleDeclineAll = () => {
    setPrefs({ essential: true, functional: false, analytics: false, marketing: false });
    declineAll();
  };

  const handleSave = () => {
    saveCustom(prefs);
  };

  const enabledCount = Object.values(prefs).filter(Boolean).length;

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          >
            <div
              className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #111111 100%)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-base" style={{ fontFamily: "Syne, sans-serif" }}>
                      Preferências de Cookies
                    </h2>
                    <p className="text-white/40 text-xs">{enabledCount} de 4 categorias ativas</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Intro */}
              <div className="px-6 py-4 border-b border-white/8 flex-shrink-0">
                <p className="text-white/50 text-sm leading-relaxed">
                  Nós e nossos parceiros usamos cookies para personalizar conteúdo, analisar tráfego e exibir anúncios relevantes.
                  Você pode escolher quais categorias aceita. Suas preferências serão salvas por 1 ano.{" "}
                  <a href="/cookies" className="text-amber-400 hover:underline inline-flex items-center gap-1">
                    Política de Cookies <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>

              {/* Categories — scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className="rounded-xl border border-white/8 overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    {/* Category header */}
                    <div className="flex items-center gap-3 p-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                        {cat.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold text-sm" style={{ fontFamily: "Syne, sans-serif" }}>
                            {cat.title}
                          </span>
                          {cat.required && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 font-medium">
                              Obrigatório
                            </span>
                          )}
                        </div>
                        <p className="text-white/40 text-xs mt-0.5 line-clamp-2">{cat.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Toggle */}
                        <button
                          onClick={() => toggle(cat.id)}
                          disabled={cat.required}
                          className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                            prefs[cat.id]
                              ? "bg-amber-400"
                              : "bg-white/15"
                          } ${cat.required ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                          aria-label={`Toggle ${cat.title}`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                              prefs[cat.id] ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                        {/* Expand */}
                        <button
                          onClick={() => toggleExpand(cat.id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
                        >
                          {expanded === cat.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded cookie list */}
                    <AnimatePresence>
                      {expanded === cat.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/6 px-4 pb-4">
                            <p className="text-white/40 text-xs mt-3 mb-3 leading-relaxed">{cat.description}</p>
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr className="text-white/30">
                                    <th className="text-left pb-2 pr-3 font-medium">Nome</th>
                                    <th className="text-left pb-2 pr-3 font-medium">Provedor</th>
                                    <th className="text-left pb-2 pr-3 font-medium hidden sm:table-cell">Finalidade</th>
                                    <th className="text-left pb-2 font-medium">Duração</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {cat.cookies.map((c, i) => (
                                    <tr key={i} className="border-t border-white/4">
                                      <td className="py-2 pr-3 text-white/70 font-mono">{c.name}</td>
                                      <td className="py-2 pr-3 text-white/50">{c.provider}</td>
                                      <td className="py-2 pr-3 text-white/40 hidden sm:table-cell">{c.purpose}</td>
                                      <td className="py-2 text-white/50 whitespace-nowrap">{c.duration}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Footer actions */}
              <div className="px-6 py-5 border-t border-white/8 flex-shrink-0">
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleDeclineAll}
                    className="flex-1 py-2.5 rounded-xl border border-white/12 text-white/50 text-sm font-medium hover:border-white/25 hover:text-white/70 transition-colors"
                  >
                    Rejeitar todos
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 py-2.5 rounded-xl border border-amber-400/40 text-amber-400 text-sm font-semibold hover:bg-amber-400/10 transition-colors"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    Salvar preferências
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 py-2.5 rounded-xl shimmer text-black text-sm font-bold"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    Aceitar todos
                  </button>
                </div>
                <p className="text-white/25 text-xs text-center mt-3">
                  Você pode alterar suas preferências a qualquer momento em{" "}
                  <a href="/cookies" className="text-amber-400/60 hover:text-amber-400 underline">
                    Política de Cookies
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
