/* DevHosting — Navbar Component
   Design: Obsidian Premium — transparent on top, glass on scroll
   Sticky header with amber accent, animated mobile menu and language switcher */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Server, ChevronDown } from "lucide-react";
import { useLang, LANGUAGES } from "@/context/LanguageContext";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: t.nav.hosting, href: "#planos" },
    { label: t.nav.vps, href: "#vps" },
    { label: t.nav.domains, href: "/dominios", isPage: true },
    { label: t.nav.security, href: "#seguranca" },
    { label: t.nav.payments, href: "#pagamentos" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNav = (href: string, isPage?: boolean) => {
    setMobileOpen(false);
    if (isPage || !href.startsWith("#")) {
      window.location.href = href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const currentLang = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ top: "var(--promo-banner-h, 0px)" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[oklch(0.09_0.005_285/0.92)] backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_oklch(0_0_0/0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2.5 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_20px_oklch(0.75_0.18_75/0.4)] group-hover:shadow-[0_0_30px_oklch(0.75_0.18_75/0.6)] transition-shadow">
                <Server className="w-5 h-5 text-black" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-800 text-white tracking-tight" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>
                  Dev<span className="text-amber-400">Hosting</span>
                </span>
                <span className="text-[10px] text-white/40 font-mono-data tracking-widest uppercase">Elite Infra</span>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href, link.isPage)}
                  className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5 relative group"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              ))}
            </nav>

            {/* Right side: Language + Status + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all text-sm text-white/70 hover:text-white"
                >
                  <span className="text-base leading-none">{currentLang.flag}</span>
                  <span className="font-mono text-xs font-semibold">{currentLang.label}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-white/10 overflow-hidden shadow-2xl"
                      style={{ background: "oklch(0.11 0.005 285)" }}
                    >
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setLangOpen(false); }}
                          className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm transition-all hover:bg-white/6 ${
                            lang === l.code ? "text-amber-400 bg-amber-400/5" : "text-white/70 hover:text-white"
                          }`}
                        >
                          <span className="text-base">{l.flag}</span>
                          <span>{l.name}</span>
                          {lang === l.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                <span className="text-xs text-emerald-400 font-medium font-mono-data">{t.nav.online}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.location.href = "/painel"}
                className="px-4 py-2 rounded-xl text-sm font-medium text-amber-400 border border-amber-500/30 hover:bg-amber-500/10 transition-all"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Painel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNav("#planos")}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-black shimmer shadow-[0_0_20px_oklch(0.75_0.18_75/0.3)] hover:shadow-[0_0_30px_oklch(0.75_0.18_75/0.5)] transition-shadow"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {t.nav.start}
              </motion.button>
            </div>

            {/* Mobile: Language + Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Mobile Language Switcher */}
              <div ref={undefined} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70"
                >
                  <span className="text-sm">{currentLang.flag}</span>
                  <span className="font-mono text-xs font-semibold">{currentLang.label}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-white/10 overflow-hidden shadow-2xl z-50"
                      style={{ background: "oklch(0.11 0.005 285)" }}
                    >
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setLangOpen(false); }}
                          className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-all hover:bg-white/6 ${
                            lang === l.code ? "text-amber-400 bg-amber-400/5" : "text-white/70 hover:text-white"
                          }`}
                        >
                          <span className="text-base">{l.flag}</span>
                          <span>{l.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                className="p-2 text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{ top: "calc(var(--promo-banner-h, 0px) + 4rem)" }}
            className="fixed left-0 right-0 z-40 bg-[oklch(0.09_0.005_285/0.97)] backdrop-blur-xl border-b border-white/5 lg:hidden"
          >
            <div className="container py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNav(link.href, link.isPage)}
                  className="text-left px-4 py-3 text-base font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                onClick={() => window.location.href = "/painel"}
                className="text-left px-4 py-3 text-base font-medium text-amber-400 hover:bg-amber-500/10 rounded-xl transition-all border border-amber-500/20"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Acessar Painel
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.06 }}
                onClick={() => handleNav("#planos")}
                className="mt-2 px-5 py-3 rounded-xl text-sm font-semibold text-black shimmer text-center"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {t.nav.start}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
