/* DevHosting — Payments Section
   Design: Obsidian Premium — Global payments with crypto, Stripe, Pix
   Animated payment method icons with real logos */

import { motion } from "framer-motion";
import { Globe, Zap, Lock, TrendingUp } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const CRYPTO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663504481998/2EqK77EzANN3ZXvZMJ4rig/crypto_payments-2CTQgcuQfQW26zY8b2sNLn.webp";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663504481998/2EqK77EzANN3ZXvZMJ4rig";

const paymentMethods = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    border: "border-orange-400/20",
    logo: `${CDN}/bitcoin_9c033b48.png`,
    bg: "bg-orange-500/10",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    border: "border-purple-400/20",
    logo: `${CDN}/ethereum_0dc31ad8.png`,
    bg: "bg-purple-500/10",
  },
  {
    name: "USDT",
    symbol: "USDT",
    border: "border-emerald-400/20",
    logo: `${CDN}/usdt_cf030c63.png`,
    bg: "bg-emerald-500/10",
  },
  {
    name: "Pix",
    symbol: "BRL",
    border: "border-cyan-400/20",
    logo: `${CDN}/pix_c5c7a4aa.png`,
    bg: "bg-cyan-500/10",
  },
  {
    name: "Stripe",
    symbol: "USD/EUR",
    border: "border-indigo-400/20",
    logo: `${CDN}/stripe_44be6e3e.png`,
    bg: "bg-indigo-500/10",
  },
  {
    name: "PayPal",
    symbol: "Global",
    border: "border-blue-400/20",
    logo: `${CDN}/paypal_548e71d9.png`,
    bg: "bg-blue-500/10",
  },
];

export default function Payments() {
  const { t } = useLang();

  const benefits = [
    { icon: <Globe className="w-5 h-5" />, title: t.payments.ben1title, desc: t.payments.ben1, color: "text-amber-400" },
    { icon: <Zap className="w-5 h-5" />, title: t.payments.ben2title, desc: t.payments.ben2, color: "text-cyan-400" },
    { icon: <Lock className="w-5 h-5" />, title: t.payments.ben3title, desc: t.payments.ben3, color: "text-emerald-400" },
    { icon: <TrendingUp className="w-5 h-5" />, title: t.payments.ben4title, desc: t.payments.ben4, color: "text-indigo-400" },
  ];

  return (
    <section id="pagamentos" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-400 border border-indigo-400/20 bg-indigo-400/5 uppercase tracking-widest mb-4">
            {t.payments.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            {t.payments.title1} <span className="gradient-text">{t.payments.title2}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/50 max-w-xl mx-auto">
            {t.payments.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left: Image + Payment Methods */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={CRYPTO_IMG}
                alt="DevHosting Crypto Payments"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.09_0.005_285/0.8)] to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/60 text-sm font-mono-data">
                  {t.payments.imageCaption}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((method, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  className={`glass-card rounded-xl border ${method.border} p-4 flex flex-col items-center gap-2 cursor-default ${method.bg}`}
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img
                      src={method.logo}
                      alt={method.name}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{method.name}</span>
                  <span className="text-[10px] text-white/30 font-mono-data">{method.symbol}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl border border-white/6 p-5 flex gap-4 hover:border-white/12 transition-colors"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${b.color}`}>
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{b.title}</h4>
                    <p className="text-sm text-white/45">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Currency display */}
            <div className="glass-card rounded-xl border border-amber-400/15 p-5">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-3 font-mono-data">{t.payments.currencies}</p>
              <div className="flex flex-wrap gap-2">
                {["BRL", "USD", "EUR", "BTC", "ETH", "USDT", "LTC", "BNB"].map((cur) => (
                  <span key={cur} className="px-3 py-1 rounded-lg bg-white/5 text-white/60 text-xs font-mono-data border border-white/5">
                    {cur}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
