/* DevHosting — Infrastructure Section
   Design: Obsidian Premium — Server specs with animated counters
   Showcases dedicated server infrastructure */

import { motion } from "framer-motion";
import { Server, Wifi, HardDrive, Activity } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const SERVER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663504481998/2EqK77EzANN3ZXvZMJ4rig/server_infra-fNVCMpKy2WQVdsgMv3kyZh.webp";

const locations = [
  { city: "São Paulo", country: "BR", latency: "2ms" },
  { city: "Miami", country: "US", latency: "18ms" },
  { city: "Frankfurt", country: "DE", latency: "42ms" },
  { city: "Amsterdam", country: "NL", latency: "48ms" },
];

export default function Infrastructure() {
  const { t } = useLang();

  const specs = [
    { label: t.infra.spec1label, value: "AMD EPYC / Intel Xeon", icon: <Activity className="w-5 h-5" />, color: "text-amber-400" },
    { label: t.infra.spec2label, value: "NVMe SSD Gen 4", icon: <HardDrive className="w-5 h-5" />, color: "text-cyan-400" },
    { label: t.infra.spec3label, value: "10 Gbps Uplink", icon: <Wifi className="w-5 h-5" />, color: "text-emerald-400" },
    { label: t.infra.spec4label, value: t.infra.spec4value, icon: <Server className="w-5 h-5" />, color: "text-indigo-400" },
  ];

  return (
    <section id="vps" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400 border border-cyan-400/20 bg-cyan-400/5 uppercase tracking-widest mb-4">
            {t.infra.badge}
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            {t.infra.title1} <span className="gradient-text">{t.infra.title2}</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            {t.infra.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden float-anim">
              <img
                src={SERVER_IMG}
                alt="DevHosting Infrastructure"
                className="w-full h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.09_0.005_285/0.6)] to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-4 -right-4 glass-card rounded-2xl border border-amber-400/20 p-4 amber-glow"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 pulse-dot" />
                <div>
                  <div className="text-xs text-white/40 font-mono-data">{t.infra.uptime}</div>
                  <div className="text-xl font-black text-white font-mono-data">99.9%</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Specs + Locations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Specs */}
            <div className="grid grid-cols-2 gap-4">
              {specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl border border-white/6 p-4"
                >
                  <div className={`${spec.color} mb-2`}>{spec.icon}</div>
                  <div className="text-xs text-white/40 mb-1">{spec.label}</div>
                  <div className="text-sm font-semibold text-white font-mono-data">{spec.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Locations */}
            <div className="glass-card rounded-xl border border-white/6 p-5">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-4 font-mono-data">Data Centers</p>
              <div className="flex flex-col gap-3">
                {locations.map((loc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                      <span className="text-sm text-white">{loc.city}</span>
                      <span className="text-xs text-white/30 font-mono-data">{loc.country}</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-mono-data">{loc.latency}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const el = document.querySelector("#planos");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full py-4 rounded-xl font-bold text-black shimmer shadow-[0_0_20px_oklch(0.75_0.18_75/0.3)]"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {t.infra.cta}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
