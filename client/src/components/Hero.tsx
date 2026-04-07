/* DevHosting — Hero Section
   Design: Obsidian Premium — Full-bleed dark hero with mesh gradient
   Animated stats counter, terminal text, and floating server image */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663504481998/2EqK77EzANN3ZXvZMJ4rig/hero_bg-3YUq3vQqqnWLgejJiSxeYs.webp";

function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(value, 2000);
  return (
    <div ref={ref} className="text-center">
      <div className="font-mono-data text-3xl lg:text-4xl font-bold gradient-text">
        {value === 99.9 ? "99.9" : count}{suffix}
      </div>
      <div className="text-xs text-white/40 mt-1 uppercase tracking-widest">{label}</div>
    </div>
  );
}

const terminalLines = [
  { text: "$ devhosting status --all", delay: 0.5, color: "text-amber-400" },
  { text: "✓ Servidor BR-01 → ONLINE  [2ms]", delay: 1.0, color: "text-emerald-400" },
  { text: "✓ SSL/TLS Ativo → SEGURO", delay: 1.5, color: "text-emerald-400" },
  { text: "✓ DDoS Protection → ATIVO", delay: 2.0, color: "text-emerald-400" },
  { text: "✓ Backup Automático → OK", delay: 2.5, color: "text-emerald-400" },
];

function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-4 font-mono-data text-sm w-full max-w-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
        <span className="ml-2 text-white/30 text-xs">devhosting-terminal</span>
      </div>
      {terminalLines.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${line.color} text-xs leading-6`}
        >
          {line.text}
        </motion.div>
      ))}
      {visibleLines < terminalLines.length && (
        <span className="text-amber-400 animate-pulse">▋</span>
      )}
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { label: t.hero.stat1, value: 99.9, suffix: "%" },
    { label: "1200+", value: 1200, suffix: "+" },
    { label: t.hero.stat3, value: 48, suffix: "" },
    { label: t.hero.stat4, value: 24, suffix: "/7" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.09_0.005_285/0.3)] via-[oklch(0.09_0.005_285/0.5)] to-[oklch(0.09_0.005_285)]" />
      </div>

      {/* Content */}
      <div className="relative container flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-32 flex-1">
        {/* Left: Text */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-amber-400/20 text-amber-400 text-sm font-medium mb-6"
          >
            <Shield className="w-4 h-4" />
            <span>{t.hero.badge}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-4 sm:mb-6"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {t.hero.title1}
            <br />
            <span className="gradient-text">{t.hero.title2}</span>
            <br />
            <span className="text-white/80">{t.hero.title3}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0"
          >
            {t.hero.subtitle}
            <span className="text-amber-400 font-medium"> {t.hero.subtitleHighlight}</span>
            {t.hero.subtitleEnd}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNav("#planos")}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-black shimmer shadow-[0_0_30px_oklch(0.75_0.18_75/0.4)] hover:shadow-[0_0_50px_oklch(0.75_0.18_75/0.6)] transition-shadow"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {t.hero.cta1}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNav("#seguranca")}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white glass-card border border-white/10 hover:border-amber-400/30 transition-colors"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {t.hero.cta2}
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-6 mt-10 justify-center lg:justify-start"
          >
            {[
              { icon: <Zap className="w-4 h-4 text-amber-400" />, text: `${t.hero.stat1} 99.9%` },
              { icon: <Shield className="w-4 h-4 text-emerald-400" />, text: t.hero.stat2 },
              { icon: <Globe className="w-4 h-4 text-blue-400" />, text: t.hero.stat3 },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm text-white/50">
                {badge.icon}
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-shrink-0 float-anim w-full sm:w-auto"
        >
          <Terminal />
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="relative container pb-12 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="glass-card rounded-2xl border border-white/5 p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          {stats.map((stat, i) => (
            <StatCard key={i} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
