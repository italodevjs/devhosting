/* DevHosting — Página de Política de Cookies */

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Cookie, Shield, BarChart2, Megaphone, Settings2, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCookies } from "../context/CookieContext";

export default function CookiesPage() {
  const { openModal, consent } = useCookies();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const statusLabel = {
    pending: { text: "Pendente", color: "text-yellow-400 bg-yellow-400/10" },
    accepted_all: { text: "Todos aceitos", color: "text-green-400 bg-green-400/10" },
    declined_all: { text: "Todos rejeitados", color: "text-red-400 bg-red-400/10" },
    custom: { text: "Personalizado", color: "text-amber-400 bg-amber-400/10" },
  }[consent.status];

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Privacidade</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
              Política de Cookies
            </h1>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-2xl">
              Esta página explica como a DevHosting usa cookies e tecnologias similares, quais dados são coletados e
              como você pode gerenciar suas preferências.
            </p>
            <div className="flex flex-wrap gap-3 mt-4 text-sm text-white/30">
              <span>Última atualização: 9 de abril de 2025</span>
              <span>·</span>
              <span>Versão 2.0</span>
            </div>
          </motion.div>

          {/* Status atual do consentimento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl border border-white/10 p-5 sm:p-6 mb-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-white font-bold text-base mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
                  Suas preferências atuais
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusLabel.color}`}>
                    {statusLabel.text}
                  </span>
                  {consent.timestamp && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/40">
                      Salvo em {new Date(consent.timestamp).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    { label: "Essenciais", active: true, icon: <Shield className="w-3 h-3" /> },
                    { label: "Funcionais", active: consent.preferences.functional, icon: <Settings2 className="w-3 h-3" /> },
                    { label: "Analíticos", active: consent.preferences.analytics, icon: <BarChart2 className="w-3 h-3" /> },
                    { label: "Marketing", active: consent.preferences.marketing, icon: <Megaphone className="w-3 h-3" /> },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${
                        item.active ? "bg-amber-400/10 text-amber-400" : "bg-white/5 text-white/30"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={openModal}
                className="flex-shrink-0 px-5 py-2.5 rounded-xl shimmer text-black text-sm font-bold whitespace-nowrap"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Gerenciar preferências
              </button>
            </div>
          </motion.div>

          {/* Conteúdo da política */}
          <div className="prose prose-invert max-w-none space-y-10">

            {/* O que são cookies */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
                O que são cookies?
              </h2>
              <p className="text-white/55 leading-relaxed">
                Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles
                permitem que o site lembre suas ações e preferências ao longo do tempo, para que você não precise
                reinseri-las sempre que retornar ao site ou navegar entre páginas.
              </p>
              <p className="text-white/55 leading-relaxed mt-3">
                Além de cookies tradicionais, também podemos usar tecnologias similares como pixels de rastreamento,
                armazenamento local (localStorage) e fingerprinting de dispositivo para finalidades descritas nesta
                política.
              </p>
            </section>

            {/* Tipos de cookies */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-5" style={{ fontFamily: "Syne, sans-serif" }}>
                Categorias de cookies que usamos
              </h2>

              {[
                {
                  icon: <Shield className="w-5 h-5 text-green-400" />,
                  color: "green",
                  title: "1. Cookies Essenciais",
                  badge: "Sempre ativos",
                  badgeColor: "bg-green-400/10 text-green-400",
                  desc: "São estritamente necessários para o funcionamento do site. Sem eles, funcionalidades básicas como login, segurança, carrinho de compras e processamento de pagamentos não funcionam. Esses cookies não coletam informações que possam ser usadas para fins de marketing.",
                  examples: ["Sessão de autenticação", "Token CSRF de segurança", "Preferências de consentimento", "Sessão de pagamento Stripe"],
                },
                {
                  icon: <Settings2 className="w-5 h-5 text-blue-400" />,
                  color: "blue",
                  title: "2. Cookies Funcionais",
                  badge: "Opcionais",
                  badgeColor: "bg-blue-400/10 text-blue-400",
                  desc: "Permitem que o site lembre escolhas que você fez, como idioma preferido, moeda, tema visual e itens no carrinho. Esses cookies melhoram sua experiência, mas não são estritamente necessários.",
                  examples: ["Idioma selecionado (PT/EN/ES/RU)", "Tema dark/light", "Itens no carrinho de domínios", "Contexto do chat de suporte"],
                },
                {
                  icon: <BarChart2 className="w-5 h-5 text-amber-400" />,
                  color: "amber",
                  title: "3. Cookies Analíticos",
                  badge: "Opcionais",
                  badgeColor: "bg-amber-400/10 text-amber-400",
                  desc: "Coletam informações sobre como os visitantes usam o site — quais páginas são mais visitadas, de onde vêm os usuários e se ocorrem erros. Todos os dados são anonimizados ou pseudonimizados e usados exclusivamente para melhorar o site.",
                  examples: ["Google Analytics 4 (GA4)", "Hotjar (mapas de calor)", "Análise de funil de conversão", "Relatórios de desempenho de página"],
                },
                {
                  icon: <Megaphone className="w-5 h-5 text-purple-400" />,
                  color: "purple",
                  title: "4. Cookies de Marketing",
                  badge: "Opcionais",
                  badgeColor: "bg-purple-400/10 text-purple-400",
                  desc: "São usados para rastrear visitantes em diferentes sites e exibir anúncios relevantes para você. Também medem a eficácia das nossas campanhas publicitárias. Esses cookies são definidos por parceiros de publicidade.",
                  examples: ["Meta Pixel (Facebook/Instagram Ads)", "Google Ads (remarketing)", "TikTok Pixel", "LinkedIn Insight Tag"],
                },
              ].map((cat) => (
                <div key={cat.title} className="glass-card rounded-xl border border-white/8 p-5 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                      {cat.icon}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-white font-bold text-sm sm:text-base" style={{ fontFamily: "Syne, sans-serif" }}>
                        {cat.title}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cat.badgeColor}`}>
                        {cat.badge}
                      </span>
                    </div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-3">{cat.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.examples.map((ex) => (
                      <span key={ex} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-white/40">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Seus direitos */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
                Seus direitos (LGPD & GDPR)
              </h2>
              <p className="text-white/55 leading-relaxed mb-4">
                Nos termos da Lei Geral de Proteção de Dados (LGPD) e do Regulamento Geral de Proteção de Dados da UE
                (GDPR), você tem os seguintes direitos:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: "Acesso", desc: "Solicitar uma cópia dos seus dados pessoais que processamos" },
                  { title: "Retificação", desc: "Corrigir dados incorretos ou incompletos" },
                  { title: "Exclusão", desc: "Solicitar a exclusão dos seus dados ('direito ao esquecimento')" },
                  { title: "Portabilidade", desc: "Receber seus dados em formato estruturado e legível por máquina" },
                  { title: "Oposição", desc: "Opor-se ao processamento baseado em interesse legítimo" },
                  { title: "Retirada do consentimento", desc: "Retirar seu consentimento a qualquer momento" },
                ].map((right) => (
                  <div key={right.title} className="flex gap-3 p-3 rounded-xl bg-white/3 border border-white/6">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                    <div>
                      <span className="text-white font-semibold text-sm">{right.title}: </span>
                      <span className="text-white/45 text-sm">{right.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contato */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3" style={{ fontFamily: "Syne, sans-serif" }}>
                Contato e DPO
              </h2>
              <p className="text-white/55 leading-relaxed">
                Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em contato com nosso Encarregado
                de Proteção de Dados (DPO):
              </p>
              <div className="mt-4 p-4 rounded-xl bg-white/3 border border-white/8">
                <p className="text-white/70 text-sm"><strong className="text-white">E-mail:</strong> privacidade@devhosting.com.br</p>
                <p className="text-white/70 text-sm mt-1"><strong className="text-white">Prazo de resposta:</strong> até 15 dias úteis</p>
                <p className="text-white/70 text-sm mt-1">
                  <strong className="text-white">Mais informações:</strong>{" "}
                  <a href="/privacidade" className="text-amber-400 hover:underline inline-flex items-center gap-1">
                    Política de Privacidade <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </section>

            {/* CTA final */}
            <div className="glass-card rounded-2xl border border-amber-400/20 p-6 text-center">
              <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "Syne, sans-serif" }}>
                Gerencie suas preferências agora
              </h3>
              <p className="text-white/45 text-sm mb-4">
                Você pode alterar suas escolhas de cookies a qualquer momento.
              </p>
              <button
                onClick={openModal}
                className="px-8 py-3 rounded-xl shimmer text-black text-sm font-bold"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Abrir preferências de cookies
              </button>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
