/* DevHosting — Domain Search Page
   Design: Obsidian Premium — Full GoDaddy-style domain marketplace
   Features: Real-time search, availability check, suggestions, cart, checkout */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Globe, ShoppingCart, Check, X, AlertCircle, Sparkles,
  ChevronDown, ChevronUp, Trash2, Plus, Minus, ArrowLeft, Star,
  Zap, Shield, RefreshCw, Tag, Clock, Lock, CreditCard, Bitcoin,
  Filter, TrendingUp
} from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatButton from "@/components/AIChatButton";
import {
  ALL_TLDS, checkDomainAvailability, generateSuggestions, parseDomainInput,
  type DomainResult, type TLDInfo
} from "@/lib/domainUtils";
import { useDomainCart } from "@/hooks/useDomainCart";

// ─── Category filter tabs ─────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", label: "Todos" },
  { id: "br", label: "Brasil (.br)" },
  { id: "popular", label: "Populares" },
  { id: "tech", label: "Tech" },
  { id: "business", label: "Negócios" },
  { id: "generic", label: "Genéricos" },
];

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: DomainResult["status"] }) {
  if (status === "loading") return (
    <span className="flex items-center gap-1.5 text-xs text-white/40">
      <RefreshCw className="w-3 h-3 animate-spin" /> Verificando...
    </span>
  );
  if (status === "available") return (
    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
      <Check className="w-3 h-3" /> Disponível
    </span>
  );
  if (status === "premium") return (
    <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
      <Star className="w-3 h-3" /> Premium
    </span>
  );
  if (status === "error" || status === "unknown") return (
    <span className="flex items-center gap-1.5 text-xs text-white/30 bg-white/5 px-2.5 py-1 rounded-full">
      <AlertCircle className="w-3 h-3" /> Indisponível
    </span>
  );
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold text-red-400/80 bg-red-400/10 px-2.5 py-1 rounded-full">
      <X className="w-3 h-3" /> Indisponível
    </span>
  );
}

// ─── Domain result row ────────────────────────────────────────────────────────
function DomainRow({
  result, onAdd, onRemove, inCart, isHighlight
}: {
  result: DomainResult;
  onAdd: () => void;
  onRemove: () => void;
  inCart: boolean;
  isHighlight?: boolean;
}) {
  const canAdd = result.status === "available" || result.status === "premium";
  const displayPrice = result.isPremium ? result.premiumPrice! : result.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
        isHighlight
          ? "border-amber-400/30 bg-gradient-to-r from-amber-400/8 to-transparent"
          : canAdd
          ? "border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5"
          : "border-white/4 bg-white/1 opacity-60"
      }`}
    >
      {/* Domain name */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
          canAdd ? "bg-amber-400/10" : "bg-white/5"
        }`}>
          <Globe className={`w-4 h-4 ${canAdd ? "text-amber-400" : "text-white/30"}`} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-mono-data font-semibold text-sm sm:text-base ${canAdd ? "text-white" : "text-white/40"}`}>
              {result.domain}
              <span className={`${isHighlight ? "text-amber-400" : canAdd ? "text-white/60" : "text-white/25"}`}>
                {result.tld}
              </span>
            </span>
            {result.badge && (
              <span className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                {result.badge}
              </span>
            )}
          </div>
          {canAdd && (
            <p className="text-xs text-white/30 mt-0.5">
              Renovação: R$ {result.renewPrice.toFixed(2).replace(".", ",")}/ano
            </p>
          )}
          {result.status === "taken" && result.registrar && (
            <p className="text-xs text-white/20 mt-0.5">
              Registrador: {result.registrar.length > 30 ? result.registrar.slice(0, 30) + "..." : result.registrar}
            </p>
          )}
          {result.status === "taken" && result.expiresAt && (
            <p className="text-xs text-white/20 mt-0.5">
              Expira em: {new Date(result.expiresAt).toLocaleDateString("pt-BR")}
            </p>
          )}
        </div>
      </div>

      {/* Status + price + action */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <StatusBadge status={result.status} />

        {canAdd && (
          <div className="text-right hidden sm:block">
            <div className="font-mono-data font-bold text-white text-sm">
              R$ {displayPrice.toFixed(2).replace(".", ",")}
            </div>
            <div className="text-[10px] text-white/30">/ano</div>
          </div>
        )}

        {canAdd && (
          inCart ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onRemove}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-400/15 border border-emerald-400/30 text-emerald-400 text-xs font-semibold hover:bg-red-400/15 hover:border-red-400/30 hover:text-red-400 transition-all group"
            >
              <Check className="w-3.5 h-3.5 group-hover:hidden" />
              <X className="w-3.5 h-3.5 hidden group-hover:block" />
              <span className="group-hover:hidden">Adicionado</span>
              <span className="hidden group-hover:block">Remover</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAdd}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg shimmer text-black text-xs font-bold shadow-[0_0_15px_oklch(0.75_0.18_75/0.3)]"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              <Plus className="w-3.5 h-3.5" />
              Adicionar
            </motion.button>
          )
        )}
      </div>
    </motion.div>
  );
}

// ─── Cart sidebar ─────────────────────────────────────────────────────────────
function CartSidebar({
  open, onClose, items, onRemove, onUpdateYears, total, onClear
}: {
  open: boolean;
  onClose: () => void;
  items: ReturnType<typeof useDomainCart>["items"];
  onRemove: (d: string, t: string) => void;
  onUpdateYears: (d: string, t: string, y: number) => void;
  total: number;
  onClear: () => void;
}) {
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setCheckoutDone(true);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col"
            style={{ background: "oklch(0.10 0.006 285)", borderLeft: "1px solid oklch(1 0 0 / 8%)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/8">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/15 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
                    Carrinho de Domínios
                  </h2>
                  <p className="text-xs text-white/40">{items.length} domínio{items.length !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/8 text-white/50 hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-white/20" />
                  </div>
                  <div>
                    <p className="text-white/50 font-medium">Carrinho vazio</p>
                    <p className="text-white/30 text-sm mt-1">Busque e adicione domínios</p>
                  </div>
                </div>
              ) : checkoutDone ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="w-20 h-20 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center"
                  >
                    <Check className="w-10 h-10 text-emerald-400" />
                  </motion.div>
                  <div>
                    <p className="text-white font-bold text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>Pedido Realizado!</p>
                    <p className="text-white/40 text-sm mt-1">Em breve você receberá um e-mail de confirmação</p>
                  </div>
                  <button
                    onClick={() => { setCheckoutDone(false); onClear(); onClose(); }}
                    className="px-5 py-2.5 rounded-xl shimmer text-black text-sm font-bold"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    Voltar à busca
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.domain + item.tld}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="glass-card rounded-xl border border-white/8 p-4"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="font-mono-data font-semibold text-white text-sm">
                          {item.domain}<span className="text-amber-400">{item.tld}</span>
                        </p>
                        <p className="text-xs text-white/30 mt-0.5">
                          R$ {item.price.toFixed(2).replace(".", ",")}/ano
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(item.domain, item.tld)}
                        className="p-1.5 rounded-lg hover:bg-red-400/15 text-white/30 hover:text-red-400 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Years selector */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40">Período de registro</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateYears(item.domain, item.tld, Math.max(1, item.years - 1))}
                          className="w-7 h-7 rounded-lg bg-white/8 hover:bg-white/15 text-white/60 hover:text-white flex items-center justify-center transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono-data text-sm text-white w-12 text-center">
                          {item.years} {item.years === 1 ? "ano" : "anos"}
                        </span>
                        <button
                          onClick={() => onUpdateYears(item.domain, item.tld, Math.min(10, item.years + 1))}
                          className="w-7 h-7 rounded-lg bg-white/8 hover:bg-white/15 text-white/60 hover:text-white flex items-center justify-center transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/6 flex justify-between items-center">
                      <span className="text-xs text-white/40">Subtotal</span>
                      <span className="font-mono-data font-bold text-amber-400 text-sm">
                        R$ {(item.price * item.years).toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && !checkoutDone && (
              <div className="p-4 border-t border-white/8 space-y-3">
                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 py-2">
                  {[
                    { icon: <Lock className="w-3 h-3" />, text: "SSL Seguro" },
                    { icon: <Shield className="w-3 h-3" />, text: "Dados Protegidos" },
                    { icon: <CreditCard className="w-3 h-3" />, text: "Pix / Cripto" },
                  ].map((b, i) => (
                    <div key={i} className="flex items-center gap-1 text-[10px] text-white/30">
                      {b.icon}
                      <span>{b.text}</span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="glass-card rounded-xl border border-white/8 p-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-white/40">Total</p>
                    <p className="font-mono-data font-black text-white text-xl">
                      R$ {total.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/30">{items.reduce((s, i) => s + i.years, 0)} ano(s)</p>
                    <p className="text-xs text-emerald-400">WHOIS Privacy Grátis</p>
                  </div>
                </div>

                {/* Payment methods */}
                <div className="flex items-center gap-2 justify-center">
                  {["Pix", "Stripe", "BTC", "ETH"].map((m) => (
                    <span key={m} className="text-[10px] font-mono-data text-white/30 bg-white/5 border border-white/8 px-2 py-1 rounded">
                      {m}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  disabled={checkingOut}
                  className="w-full py-4 rounded-xl shimmer text-black font-bold text-base shadow-[0_0_25px_oklch(0.75_0.18_75/0.4)] disabled:opacity-70 flex items-center justify-center gap-2"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {checkingOut ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Finalizar Registro
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Suggestion chip ──────────────────────────────────────────────────────────
function SuggestionChip({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-white/10 hover:border-amber-400/30 text-sm text-white/60 hover:text-white transition-all font-mono-data"
    >
      <Sparkles className="w-3 h-3 text-amber-400/60" />
      {name}
    </motion.button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function DomainSearch() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [results, setResults] = useState<DomainResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const cart = useDomainCart();

  const filteredTLDs = activeCategory === "all"
    ? ALL_TLDS
    : ALL_TLDS.filter((t) => t.category === activeCategory);

  const handleSearch = useCallback(async (searchQuery?: string) => {
    const q = (searchQuery ?? query).trim();
    if (!q) return;

    const { name } = parseDomainInput(q);
    if (!name) return;

    setIsSearching(true);
    setHasSearched(true);
    setShowAllResults(false);
    setResults([]);
    setSuggestions(generateSuggestions(name));

    const tldsToCheck = filteredTLDs;
    const res = await checkDomainAvailability(name, tldsToCheck);
    setResults(res);
    setIsSearching(false);
  }, [query, filteredTLDs]);

  // Re-search when category changes (if already searched)
  useEffect(() => {
    if (hasSearched && query.trim()) {
      handleSearch();
    }
  }, [activeCategory]);

  const availableResults = results.filter((r) => r.status === "available" || r.status === "premium");
  const takenResults = results.filter((r) => r.status === "taken");

  const displayedAvailable = showAllResults ? availableResults : availableResults.slice(0, 8);
  const displayedTaken = showAllResults ? takenResults : takenResults.slice(0, 4);

  // Highlight: first .com.br or .com result
  const highlightTld = results.find(
    (r) => (r.tld === ".com.br" || r.tld === ".com") && r.status === "available"
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Cart sidebar */}
      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        onRemove={cart.removeItem}
        onUpdateYears={cart.updateYears}
        total={cart.total}
        onClear={cart.clearCart}
      />

      {/* Floating cart button */}
      <AnimatePresence>
        {cart.count > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCartOpen(true)}
            className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-2xl shimmer text-black shadow-[0_0_30px_oklch(0.75_0.18_75/0.5)] flex items-center justify-center"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-400 text-black text-xs font-bold flex items-center justify-center">
              {cart.count}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <main className="pt-24 pb-20">
        {/* ── Hero search section ── */}
        <section className="relative overflow-hidden py-16 lg:py-24">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-400/5 blur-3xl rounded-full" />
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full" />
          </div>

          <div className="container relative">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link href="/">
                <a className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Voltar ao início
                </a>
              </Link>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-amber-400/20 text-amber-400 text-sm font-medium mb-5">
                <Globe className="w-4 h-4" />
                <span>Registro de Domínios</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-4"
                style={{ fontFamily: 'Syne, sans-serif' }}>
                Encontre seu<br />
                <span className="gradient-text">domínio perfeito</span>
              </h1>
              <p className="text-lg text-white/50 max-w-lg mx-auto">
                Mais de 27 extensões disponíveis. WHOIS Privacy grátis em todos os planos.
                Aceite pagamentos em <span className="text-amber-400">Pix, Cripto e Cartão</span>.
              </p>
            </motion.div>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Digite seu domínio (ex: minhaempresa)"
                    className="w-full pl-12 pr-4 py-4 lg:py-5 rounded-xl glass-card border border-white/10 text-white placeholder-white/25 text-base lg:text-lg focus:outline-none focus:border-amber-400/50 transition-all font-mono-data"
                    autoFocus
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSearch()}
                  disabled={isSearching || !query.trim()}
                  className="px-6 lg:px-8 py-4 lg:py-5 rounded-xl font-bold text-black shimmer flex items-center gap-2 shadow-[0_0_25px_oklch(0.75_0.18_75/0.4)] disabled:opacity-60 disabled:cursor-not-allowed text-sm lg:text-base"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {isSearching ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  <span className="hidden sm:block">Buscar</span>
                </motion.button>
              </div>

              {/* Quick search examples */}
              {!hasSearched && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 flex flex-wrap gap-2 justify-center"
                >
                  <span className="text-xs text-white/30 self-center">Exemplos:</span>
                  {["minhaempresa", "devstudio", "techbr", "loja2025", "agencia"].map((ex) => (
                    <button
                      key={ex}
                      onClick={() => { setQuery(ex); handleSearch(ex); }}
                      className="text-xs font-mono-data text-white/40 hover:text-amber-400 bg-white/4 hover:bg-amber-400/8 border border-white/8 hover:border-amber-400/20 px-2.5 py-1 rounded-lg transition-all"
                    >
                      {ex}
                    </button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* ── Category filter ── */}
        <section className="container mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="w-4 h-4 text-white/30 flex-shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-amber-400 text-black"
                    : "glass-card border border-white/8 text-white/50 hover:text-white hover:border-white/20"
                }`}
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* ── Results ── */}
        <section className="container">
          {/* Loading skeleton */}
          {isSearching && (
            <div className="space-y-3 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <RefreshCw className="w-5 h-5 text-amber-400 animate-spin" />
                <span className="text-white/60">Verificando disponibilidade de domínios...</span>
              </div>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  className="h-16 rounded-xl bg-white/4 border border-white/6"
                />
              ))}
            </div>
          )}

          {/* Results list */}
          {!isSearching && hasSearched && results.length > 0 && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Summary bar */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl border border-white/8 p-4 flex flex-wrap items-center justify-between gap-3"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm text-white/60">
                      <span className="text-white font-semibold">{availableResults.length}</span> disponíveis
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400/60" />
                    <span className="text-sm text-white/60">
                      <span className="text-white font-semibold">{takenResults.length}</span> indisponíveis
                    </span>
                  </div>
                </div>
                {cart.count > 0 && (
                  <button
                    onClick={() => setCartOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl shimmer text-black text-sm font-bold"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Ver carrinho ({cart.count})
                  </button>
                )}
              </motion.div>

              {/* Highlight: best result */}
              {highlightTld && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-semibold text-amber-400" style={{ fontFamily: 'Syne, sans-serif' }}>
                      Melhor opção
                    </span>
                  </div>
                  <DomainRow
                    result={highlightTld}
                    onAdd={() => cart.addItem({ domain: highlightTld.domain, tld: highlightTld.tld, price: highlightTld.price, years: 1 })}
                    onRemove={() => cart.removeItem(highlightTld.domain, highlightTld.tld)}
                    inCart={cart.hasItem(highlightTld.domain, highlightTld.tld)}
                    isHighlight
                  />
                </div>
              )}

              {/* Available domains */}
              {availableResults.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-400" style={{ fontFamily: 'Syne, sans-serif' }}>
                      Disponíveis ({availableResults.length})
                    </span>
                  </div>
                  <div className="space-y-2">
                    {displayedAvailable
                      .filter((r) => r.fullDomain !== highlightTld?.fullDomain)
                      .map((result) => (
                        <DomainRow
                          key={result.fullDomain}
                          result={result}
                          onAdd={() => cart.addItem({ domain: result.domain, tld: result.tld, price: result.price, years: 1 })}
                          onRemove={() => cart.removeItem(result.domain, result.tld)}
                          inCart={cart.hasItem(result.domain, result.tld)}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Taken domains */}
              {takenResults.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <X className="w-4 h-4 text-red-400/70" />
                    <span className="text-sm font-semibold text-white/40" style={{ fontFamily: 'Syne, sans-serif' }}>
                      Indisponíveis ({takenResults.length})
                    </span>
                  </div>
                  <div className="space-y-2">
                    {displayedTaken.map((result) => (
                      <DomainRow
                        key={result.fullDomain}
                        result={result}
                        onAdd={() => {}}
                        onRemove={() => {}}
                        inCart={false}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Show more */}
              {!showAllResults && (availableResults.length > 8 || takenResults.length > 4) && (
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowAllResults(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card border border-white/10 hover:border-amber-400/30 text-white/60 hover:text-white text-sm font-semibold transition-all"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    <ChevronDown className="w-4 h-4" />
                    Ver todos os {results.length} resultados
                  </motion.button>
                </div>
              )}

              {/* Smart suggestions */}
              {suggestions.length > 0 && (
                <div className="glass-card rounded-2xl border border-white/8 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                      Sugestões inteligentes
                    </span>
                    <span className="text-xs text-white/30">Nomes alternativos para você</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <SuggestionChip
                        key={s}
                        name={s}
                        onClick={() => { setQuery(s); handleSearch(s); }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Empty state (no search yet) */}
          {!hasSearched && (
            <div className="max-w-4xl mx-auto">
              {/* TLD showcase grid */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                    Extensões disponíveis
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {filteredTLDs.map((tld, i) => (
                    <motion.div
                      key={tld.ext}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ y: -3, scale: 1.03 }}
                      className={`glass-card rounded-xl border p-4 text-center cursor-pointer transition-all ${
                        tld.badge ? "border-amber-400/20 hover:border-amber-400/40" : "border-white/6 hover:border-white/15"
                      }`}
                      onClick={() => inputRef.current?.focus()}
                    >
                      {tld.badge && (
                        <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wide mb-1.5">
                          {tld.badge}
                        </div>
                      )}
                      <div className="text-lg font-black text-white font-mono-data mb-1">{tld.ext}</div>
                      <div className="text-xs text-white/40">
                        R$ {tld.price.toFixed(2).replace(".", ",")}<span className="text-[10px]">/ano</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: <Shield className="w-5 h-5 text-emerald-400" />,
                    title: "WHOIS Privacy Grátis",
                    desc: "Seus dados pessoais protegidos em todos os registros, sem custo adicional.",
                    color: "border-emerald-400/15 bg-emerald-400/3"
                  },
                  {
                    icon: <Zap className="w-5 h-5 text-amber-400" />,
                    title: "Ativação Imediata",
                    desc: "Domínio ativo em minutos após a confirmação do pagamento.",
                    color: "border-amber-400/15 bg-amber-400/3"
                  },
                  {
                    icon: <RefreshCw className="w-5 h-5 text-indigo-400" />,
                    title: "Renovação Automática",
                    desc: "Nunca perca seu domínio. Renovação automática com aviso antecipado.",
                    color: "border-indigo-400/15 bg-indigo-400/3"
                  },
                  {
                    icon: <Lock className="w-5 h-5 text-blue-400" />,
                    title: "DNS Gerenciado",
                    desc: "Painel completo para gerenciar registros DNS, subdomínios e redirecionamentos.",
                    color: "border-blue-400/15 bg-blue-400/3"
                  },
                  {
                    icon: <Tag className="w-5 h-5 text-pink-400" />,
                    title: "Preços Transparentes",
                    desc: "Sem taxas ocultas. O preço que você vê é o preço que você paga.",
                    color: "border-pink-400/15 bg-pink-400/3"
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-cyan-400" />,
                    title: "Suporte 24/7",
                    desc: "Nossa IA e equipe técnica estão disponíveis a qualquer hora.",
                    color: "border-cyan-400/15 bg-cyan-400/3"
                  },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className={`rounded-xl border p-5 ${f.color}`}
                  >
                    <div className="mb-3">{f.icon}</div>
                    <h3 className="font-bold text-white text-sm mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                      {f.title}
                    </h3>
                    <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
      <AIChatButton />
    </div>
  );
}
