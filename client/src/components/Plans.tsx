/* DevHosting — Plans Section — fully i18n */
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Server, Globe } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function Plans() {
  const { t } = useLang();
  const [isAnnual, setIsAnnual] = useState(false);
  const [tab, setTab] = useState<"hosting" | "vps">("hosting");

  const HOSTING_PLANS = [
    {
      name: "Starter",
      icon: <Globe className="w-5 h-5" />,
      desc: t.plansData.starterDesc,
      monthly: 19.90, annual: 14.90,
      color: "border-white/10", highlight: false,
      features: [t.plansData.feat.oneSite, t.plansData.feat.ssd10, t.plansData.feat.unlimitedBw, t.plansData.feat.sslFree, t.plansData.feat.email1, t.plansData.feat.cpanel, t.plansData.feat.aiSupport],
    },
    {
      name: "Pro",
      icon: <Zap className="w-5 h-5" />,
      desc: t.plansData.proDesc,
      monthly: 49.90, annual: 37.90,
      color: "border-amber-400/40", highlight: true,
      badge: t.plansData.popularBadge,
      features: [t.plansData.feat.unlimitedSites, t.plansData.feat.ssd50, t.plansData.feat.unlimitedBw, t.plansData.feat.sslWildcard, t.plansData.feat.emailUnlimited, t.plansData.feat.cpanelSsh, t.plansData.feat.backupDaily, t.plansData.feat.cdnGlobal, t.plansData.feat.support247],
    },
    {
      name: "Business",
      icon: <Server className="w-5 h-5" />,
      desc: t.plansData.businessDesc,
      monthly: 99.90, annual: 74.90,
      color: "border-indigo-400/30", highlight: false,
      features: [t.plansData.feat.unlimitedSites, t.plansData.feat.ssd200, t.plansData.feat.unlimitedBw, t.plansData.feat.sslWildcard, t.plansData.feat.emailUnlimited, t.plansData.feat.cpanelSshGit, t.plansData.feat.backupSnapshot, t.plansData.feat.cdnWaf, t.plansData.feat.dedicatedIp, t.plansData.feat.support247],
    },
  ];

  const VPS_PLANS = [
    { name: "VPS Nano", specs: { CPU: "2 vCPU", RAM: "2 GB RAM", SSD: "40 GB SSD", BW: "2 TB/mo" }, monthly: 59.90, annual: 44.90, color: "border-white/10", highlight: false },
    { name: "VPS Power", specs: { CPU: "4 vCPU", RAM: "8 GB RAM", SSD: "100 GB SSD", BW: "5 TB/mo" }, monthly: 129.90, annual: 97.90, color: "border-amber-400/40", highlight: true, badge: t.plansData.bestValueBadge },
    { name: "VPS Ultra", specs: { CPU: "8 vCPU", RAM: "16 GB RAM", SSD: "200 GB SSD", BW: "10 TB/mo" }, monthly: 249.90, annual: 187.90, color: "border-indigo-400/30", highlight: false },
  ];

  return (
    <section id="planos" className="py-24 lg:py-32">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-amber-400 border border-amber-400/20 bg-amber-400/5 uppercase tracking-widest mb-4">{t.plans.badge}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            {t.plans.title1} <span className="gradient-text">{t.plans.title2}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/50 max-w-xl mx-auto">{t.plans.subtitle}</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div className="flex items-center glass-card rounded-xl p-1 border border-white/8">
            {(["hosting", "vps"] as const).map((tb) => (
              <button key={tb} onClick={() => setTab(tb)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${tab === tb ? "bg-amber-400 text-black" : "text-white/50 hover:text-white"}`} style={{ fontFamily: 'Syne, sans-serif' }}>
                {tb === "hosting" ? t.plans.hosting : t.plans.vps}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm ${!isAnnual ? "text-white" : "text-white/40"}`}>{t.plans.monthly}</span>
            <button onClick={() => setIsAnnual(!isAnnual)} className={`relative w-12 h-6 rounded-full transition-colors ${isAnnual ? "bg-amber-400" : "bg-white/10"}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isAnnual ? "left-7" : "left-1"}`} />
            </button>
            <span className={`text-sm ${isAnnual ? "text-white" : "text-white/40"}`}>{t.plans.annual}</span>
            {isAnnual && <span className="px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400 text-xs font-semibold">{t.plans.save}</span>}
          </div>
        </div>

        {tab === "hosting" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOSTING_PLANS.map((plan, idx) => {
              const price = isAnnual ? plan.annual : plan.monthly;
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`relative rounded-2xl border ${plan.color} p-6 flex flex-col gap-5 ${plan.highlight ? "bg-gradient-to-b from-amber-400/8 to-transparent amber-glow" : "glass-card"}`}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-black text-xs font-bold uppercase tracking-wide" style={{ fontFamily: 'Syne, sans-serif' }}>{plan.badge}</div>
                  )}
                  <div>
                    <div className={`inline-flex p-2 rounded-xl mb-3 ${plan.highlight ? "bg-amber-400/15 text-amber-400" : "bg-white/5 text-white/60"}`}>{plan.icon}</div>
                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{plan.name}</h3>
                    <p className="text-sm text-white/40 mt-1">{plan.desc}</p>
                  </div>
                  <div>
                    <div className="flex items-end gap-1">
                      <span className="text-xs text-white/40 font-mono-data">R$</span>
                      <span className="text-4xl font-black text-white font-mono-data">{price.toFixed(2).replace(".", ",")}</span>
                      <span className="text-sm text-white/40 mb-1">{t.plans.perMonth}</span>
                    </div>
                    {isAnnual && <p className="text-xs text-emerald-400 mt-1">{t.plans.annualNote}</p>}
                  </div>
                  <ul className="flex flex-col gap-2.5 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-white/70">
                        <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-amber-400" : "text-emerald-400"}`} />{f}
                      </li>
                    ))}
                  </ul>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} disabled
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all opacity-60 cursor-not-allowed ${plan.highlight ? "shimmer text-black shadow-[0_0_20px_oklch(0.75_0.18_75/0.3)]" : "border border-white/10 text-white"}`}
                    style={{ fontFamily: 'Syne, sans-serif' }}>
                    {t.plans.comingSoon}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VPS_PLANS.map((plan, idx) => {
              const price = isAnnual ? plan.annual : plan.monthly;
              return (
                <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`relative rounded-2xl border ${plan.color} p-6 flex flex-col gap-5 ${plan.highlight ? "bg-gradient-to-b from-amber-400/8 to-transparent amber-glow" : "glass-card"}`}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-black text-xs font-bold uppercase tracking-wide" style={{ fontFamily: 'Syne, sans-serif' }}>{plan.badge}</div>
                  )}
                  <div>
                    <div className={`inline-flex p-2 rounded-xl mb-3 ${plan.highlight ? "bg-amber-400/15 text-amber-400" : "bg-white/5 text-white/60"}`}><Server className="w-5 h-5" /></div>
                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{plan.name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(plan.specs).map(([key, val]) => (
                      <div key={key} className="bg-white/4 rounded-xl p-3">
                        <div className="text-xs text-white/40 uppercase tracking-wide mb-1">{key}</div>
                        <div className="text-sm font-semibold text-white font-mono-data">{val}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-xs text-white/40 font-mono-data">R$</span>
                    <span className="text-4xl font-black text-white font-mono-data">{price.toFixed(2).replace(".", ",")}</span>
                    <span className="text-sm text-white/40 mb-1">{t.plans.perMonth}</span>
                  </div>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} disabled
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all opacity-60 cursor-not-allowed ${plan.highlight ? "shimmer text-black shadow-[0_0_20px_oklch(0.75_0.18_75/0.3)]" : "border border-white/10 text-white"}`}
                    style={{ fontFamily: 'Syne, sans-serif' }}>
                    {t.plans.comingSoon}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
