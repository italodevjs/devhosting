/* DevHosting — Domains Section (Home)
   Design: Obsidian Premium — Domain search teaser with link to full page
   Animated TLD grid + quick search + CTA to full domain marketplace */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Check, X, RefreshCw, ArrowRight, Shield, Zap, Tag } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { Link } from "wouter";
import { ALL_TLDS, checkDomainAvailability, parseDomainInput, type DomainResult } from "@/lib/domainUtils";

const FEATURED_TLDS = ALL_TLDS.filter((t) =>
  [".com.br", ".com", ".io", ".dev", ".store", ".tech", ".app", ".net"].includes(t.ext)
);

export default function Domains() {
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    const q = query.trim();
    if (!q) return;
    const { name } = parseDomainInput(q);
    if (!name) return;

    setIsSearching(true);
    setHasSearched(true);
    setResults([]);

    // Check only the top 5 TLDs for the home section teaser
    const topTlds = ALL_TLDS.filter((t) =>
      [".com.br", ".com", ".io", ".dev", ".net"].includes(t.ext)
    );
    const res = await checkDomainAvailability(name, topTlds);
    setResults(res);
    setIsSearching(false);
  };

  return (
    <section id="dominios" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-amber-400/4 blur-3xl pointer-events-none" />

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-amber-400 border border-amber-400/20 bg-amber-400/5 uppercase tracking-widest mb-4">
            {t.domains.badge}
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            {t.domains.title1} <span className="gradient-text">{t.domains.title2}</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            {t.domains.subtitle}
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Digite seu domínio..."
                className="w-full pl-12 pr-4 py-4 rounded-xl glass-card border border-white/10 text-white placeholder-white/25 text-base focus:outline-none focus:border-amber-400/40 transition-colors font-mono-data"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSearch}
              disabled={isSearching || !query.trim()}
              className="px-6 py-4 rounded-xl font-bold text-black shimmer flex items-center gap-2 shadow-[0_0_20px_oklch(0.75_0.18_75/0.3)] disabled:opacity-60"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {isSearching ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {t.domains.searchBtn}
            </motion.button>
          </div>

          {/* Loading */}
          <AnimatePresence>
            {isSearching && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 glass-card rounded-xl border border-white/8 p-4 flex items-center gap-3 text-white/50 text-sm"
              >
                <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                Verificando disponibilidade...
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick results */}
          <AnimatePresence>
            {!isSearching && hasSearched && results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 space-y-2"
              >
                {results.map((r) => (
                  <motion.div
                    key={r.fullDomain}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`glass-card rounded-xl border p-3.5 flex items-center justify-between ${
                      r.status === "available"
                        ? "border-emerald-400/20"
                        : r.status === "premium"
                        ? "border-amber-400/20"
                        : "border-white/6 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {r.status === "available" ? (
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : r.status === "taken" ? (
                        <X className="w-4 h-4 text-red-400/70 flex-shrink-0" />
                      ) : r.status === "error" || r.status === "unknown" ? (
                        <RefreshCw className="w-4 h-4 text-white/30 flex-shrink-0" />
                      ) : (
                        <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      )}
                      <span className="font-mono-data text-sm text-white">{r.fullDomain}</span>
                      {r.status === "available" && (
                        <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                          Disponível
                        </span>
                      )}
                      {r.status === "premium" && (
                        <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                          Premium
                        </span>
                      )}
                      {(r.status === "error" || r.status === "unknown") && (
                        <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full">
                          Verificando...
                        </span>
                      )}
                    </div>
                    {(r.status === "available" || r.status === "premium") && (
                      <span className="font-mono-data text-sm font-semibold text-amber-400">
                        R$ {r.price.toFixed(2).replace(".", ",")}/ano
                      </span>
                    )}
                    {r.status === "taken" && r.expiresAt && (
                      <span className="text-[10px] text-white/30">
                        Expira: {new Date(r.expiresAt).getFullYear()}
                      </span>
                    )}
                  </motion.div>
                ))}

                {/* CTA to full page */}
                <Link href="/dominios">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-xl shimmer text-black font-bold text-sm cursor-pointer"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    Ver todos os resultados e registrar
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* TLD Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
          {FEATURED_TLDS.map((tld, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className={`glass-card rounded-xl border p-4 text-center cursor-default ${
                tld.badge ? "border-amber-400/20" : "border-white/6"
              }`}
            >
              {tld.badge && (
                <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wide mb-2">
                  {tld.badge}
                </div>
              )}
              <div className="text-xl font-black text-white font-mono-data mb-1">{tld.ext}</div>
              <div className="text-sm text-white/50">
                R$ {tld.price.toFixed(2).replace(".", ",")}
                <span className="text-xs">{t.domains.perYear}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10"
        >
          {[
            { icon: <Shield className="w-4 h-4 text-emerald-400" />, text: "WHOIS Privacy Grátis" },
            { icon: <Zap className="w-4 h-4 text-amber-400" />, text: "Ativação em minutos" },
            { icon: <Tag className="w-4 h-4 text-indigo-400" />, text: "Sem taxas ocultas" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-2.5 glass-card rounded-xl border border-white/6 p-3.5">
              {f.icon}
              <span className="text-sm text-white/60">{f.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA to full domain page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/dominios">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-black shimmer shadow-[0_0_30px_oklch(0.75_0.18_75/0.4)] hover:shadow-[0_0_50px_oklch(0.75_0.18_75/0.6)] transition-shadow cursor-pointer"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              <Globe className="w-5 h-5" />
              Explorar todos os domínios
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </Link>
          <p className="text-sm text-white/30 mt-3">27+ extensões · Pix, Cripto e Cartão · Suporte 24/7</p>
        </motion.div>
      </div>
    </section>
  );
}
