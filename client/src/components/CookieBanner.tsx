/* DevHosting — CookieBanner
   LGPD/Cookie consent banner */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "devhosting_cookie_consent_v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
        >
          <div className="glass-card rounded-2xl border border-white/12 p-5 shadow-2xl">
            <div className="flex gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
                  Cookies & Privacidade
                </h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  Usamos cookies para melhorar sua experiência e analisar o tráfego do site, conforme nossa{" "}
                  <a href="/privacidade" className="text-amber-400 hover:underline">
                    Política de Privacidade
                  </a>
                  . Ao continuar, você concorda com o uso de cookies.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="flex-1 py-2.5 rounded-xl shimmer text-black text-sm font-bold"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Aceitar todos
              </button>
              <button
                onClick={decline}
                className="flex-1 py-2.5 rounded-xl border border-white/15 text-white/60 text-sm font-medium hover:border-white/30 transition-colors"
              >
                Apenas essenciais
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
