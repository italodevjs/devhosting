/* DevHosting — Domains Section
   Design: Obsidian Premium — Domain search with animated results
   Popular TLDs with pricing */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Check } from "lucide-react";

const tlds = [
  { ext: ".com.br", price: "R$ 39,90", popular: true },
  { ext: ".com", price: "R$ 59,90", popular: true },
  { ext: ".net", price: "R$ 54,90", popular: false },
  { ext: ".org", price: "R$ 54,90", popular: false },
  { ext: ".io", price: "R$ 129,90", popular: true },
  { ext: ".dev", price: "R$ 89,90", popular: true },
  { ext: ".app", price: "R$ 89,90", popular: false },
  { ext: ".tech", price: "R$ 99,90", popular: false },
];

export default function Domains() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (query.trim()) setSearched(true);
  };

  return (
    <section id="dominios" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-amber-400 border border-amber-400/20 bg-amber-400/5 uppercase tracking-widest mb-4">
            Domínios
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Registre seu <span className="gradient-text">Domínio</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Encontre o domínio perfeito para o seu negócio. Transferência gratuita e renovação automática.
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
                placeholder="seusite.com.br"
                className="w-full pl-12 pr-4 py-4 rounded-xl glass-card border border-white/10 text-white placeholder-white/25 text-base focus:outline-none focus:border-amber-400/40 transition-colors font-mono-data"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSearch}
              className="px-6 py-4 rounded-xl font-bold text-black shimmer flex items-center gap-2 shadow-[0_0_20px_oklch(0.75_0.18_75/0.3)]"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              <Search className="w-5 h-5" />
              Buscar
            </motion.button>
          </div>

          {/* Search result */}
          <AnimatePresence>
            {searched && query && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 glass-card rounded-xl border border-emerald-400/20 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-mono-data">{query.includes(".") ? query : `${query}.com.br`}</span>
                  <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">Disponível</span>
                </div>
                <button
                  onClick={() => window.open(`https://wa.me/5500000000000?text=Quero registrar o domínio: ${query}`, "_blank")}
                  className="text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  Registrar →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* TLD Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {tlds.map((tld, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className={`glass-card rounded-xl border p-4 text-center cursor-default ${
                tld.popular ? "border-amber-400/20" : "border-white/6"
              }`}
            >
              {tld.popular && (
                <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wide mb-2">Popular</div>
              )}
              <div className="text-xl font-black text-white font-mono-data mb-1">{tld.ext}</div>
              <div className="text-sm text-white/50">{tld.price}<span className="text-xs">/ano</span></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
