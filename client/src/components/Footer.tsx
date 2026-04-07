/* DevHosting — Footer Component
   Design: Obsidian Premium — Dark footer with amber accents
   Links, contact info, and social media */

import { motion } from "framer-motion";
import { Server, Mail, Instagram, Github } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  const footerLinks = {
    [t.footer.hosting]: ["Starter", "Pro", "Business", "WordPress", "E-commerce"],
    VPS: ["VPS Nano", "VPS Power", "VPS Ultra", "Dedicados", "Cloud"],
    [t.footer.company]: [t.footer.about, t.footer.blog, t.footer.careers, t.footer.contact],
    [t.footer.support]: [t.footer.docs, t.footer.status, t.footer.privacy, t.footer.terms],
  };

  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

      <div className="container">
        {/* Top: Logo + Links */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_20px_oklch(0.75_0.18_75/0.3)]">
                <Server className="w-5 h-5 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                Dev<span className="text-amber-400">Hosting</span>
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="mailto:contato@devhosting.com.br"
                className="w-9 h-9 rounded-xl glass-card border border-white/8 flex items-center justify-center text-white/50 hover:text-amber-400 hover:border-amber-400/30 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-xl glass-card border border-white/8 flex items-center justify-center text-white/50 hover:text-pink-400 hover:border-pink-400/30 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-xl glass-card border border-white/8 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
              >
                <Github className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider" style={{ fontFamily: 'Syne, sans-serif' }}>
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-sm text-white/40 hover:text-amber-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30 font-mono-data">
            © 2025 DevHosting. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-white/30 hover:text-white/60 transition-colors">{t.footer.terms}</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-white/30 hover:text-white/60 transition-colors">{t.footer.privacy}</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-white/30 hover:text-white/60 transition-colors">SLA</a>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            <span className="text-xs text-emerald-400 font-mono-data">{t.nav.online}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
