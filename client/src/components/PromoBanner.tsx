/* DevHosting — PromoBanner
   Dismissible top banner with promo offer */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Tag } from "lucide-react";

const STORAGE_KEY = "devhosting_promo_dismissed_v1";

export default function PromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-50 overflow-hidden"
          style={{ background: "linear-gradient(90deg, oklch(0.55 0.18 75) 0%, oklch(0.65 0.20 65) 50%, oklch(0.55 0.18 75) 100%)" }}
        >
          <div className="container flex items-center justify-center gap-3 py-2.5 px-4 text-center">
            <Zap className="w-4 h-4 text-black flex-shrink-0" />
            <p className="text-black text-sm font-semibold">
              🔥 Oferta de lançamento: <strong>30% OFF</strong> no primeiro ano em qualquer plano de hospedagem.
              <span className="ml-2 inline-flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-full text-xs font-mono font-bold">
                <Tag className="w-3 h-3" /> DEVHOSTING30
              </span>
            </p>
            <button
              onClick={dismiss}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/20 transition-colors"
              aria-label="Fechar banner"
            >
              <X className="w-4 h-4 text-black" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
