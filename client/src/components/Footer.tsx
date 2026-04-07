/* DevHosting — Footer Component
   Design: Obsidian Premium — Dark footer with amber accents
   Links, contact info, and social media */

import { motion } from "framer-motion";
import { Server, MessageCircle, Mail, Instagram, Github } from "lucide-react";

const footerLinks = {
  Hospedagem: ["Plano Starter", "Plano Pro", "Plano Business", "Hospedagem WordPress", "Hospedagem E-commerce"],
  VPS: ["VPS Nano", "VPS Power", "VPS Ultra", "Servidores Dedicados", "Cloud Servers"],
  Domínios: ["Registrar Domínio", "Transferir Domínio", "Extensões Disponíveis", "Whois", "DNS Gerenciado"],
  Suporte: ["Central de Ajuda", "Status dos Servidores", "Contato via WhatsApp", "Documentação", "SLA & Uptime"],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

      <div className="container">
        {/* Top: Logo + Links */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663504481998/2EqK77EzANN3ZXvZMJ4rig/IMG_9021_9d52b903.jpeg"
                alt="DevHosting Logo"
                className="w-10 h-10 rounded-xl shadow-[0_0_20px_oklch(0.75_0.18_75/0.3)]"
              />
              <span className="text-lg font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                Dev<span className="text-amber-400">Hosting</span>
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mb-6">
              Hospedagem de elite com segurança certificada pela Google. Infraestrutura dedicada para desenvolvedores e empresas.
            </p>
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl glass-card border border-white/8 flex items-center justify-center text-white/50 hover:text-emerald-400 hover:border-emerald-400/30 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </motion.a>
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
                className="w-9 h-9 rounded-xl glass-card border border-white/8 flex items-center justify-center text-white/50 hover:text-pink-400 hover:border-pink-400/30 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
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
            © 2025 DevHosting. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-white/30 hover:text-white/60 transition-colors">Termos de Uso</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacidade</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-white/30 hover:text-white/60 transition-colors">SLA</a>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            <span className="text-xs text-emerald-400 font-mono-data">Todos os sistemas operacionais</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
