/* DevHosting — Navbar Component
   Design: Obsidian Premium — transparent on top, glass on scroll
   Sticky header with amber accent and animated mobile menu */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Server, Zap } from "lucide-react";

const navLinks = [
  { label: "Hospedagem", href: "#planos" },
  { label: "VPS", href: "#vps" },
  { label: "Domínios", href: "#dominios" },
  { label: "Segurança", href: "#seguranca" },
  { label: "Pagamentos", href: "#pagamentos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
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
                  onClick={() => handleNav(link.href)}
                  className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5 relative group"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                <span className="text-xs text-emerald-400 font-medium font-mono-data">ONLINE</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleNav("#planos")}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-black shimmer shadow-[0_0_20px_oklch(0.75_0.18_75/0.3)] hover:shadow-[0_0_30px_oklch(0.75_0.18_75/0.5)] transition-shadow"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Começar Agora
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
            className="fixed top-16 left-0 right-0 z-40 bg-[oklch(0.09_0.005_285/0.97)] backdrop-blur-xl border-b border-white/5 lg:hidden"
          >
            <div className="container py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNav(link.href)}
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
                onClick={() => handleNav("#planos")}
                className="mt-2 px-5 py-3 rounded-xl text-sm font-semibold text-black shimmer text-center"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Começar Agora
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
