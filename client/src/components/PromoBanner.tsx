/* DevHosting — PromoBanner
   Dismissible top banner — compact, mobile-friendly, syncs height to CSS var */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag } from "lucide-react";

const STORAGE_KEY = "devhosting_promo_dismissed_v1";

export default function PromoBanner() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Sync banner height to CSS variable so Navbar can offset itself
  useEffect(() => {
    const update = () => {
      const h = ref.current ? ref.current.offsetHeight : 0;
      document.documentElement.style.setProperty("--promo-banner-h", `${h}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [visible]);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) setVisible(true);
    else document.documentElement.style.setProperty("--promo-banner-h", "0px");
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
    document.documentElement.style.setProperty("--promo-banner-h", "0px");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative z-50 overflow-hidden"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.55 0.18 75) 0%, oklch(0.65 0.20 65) 50%, oklch(0.55 0.18 75) 100%)",
          }}
        >
          <div className="flex items-center justify-center gap-2 px-8 py-2">
            <p className="text-black text-xs sm:text-sm font-semibold leading-snug text-center">
              🔥 <strong>30% OFF</strong> no primeiro ano —{" "}
              <span className="inline-flex items-center gap-1 bg-black/15 px-1.5 py-0.5 rounded font-mono font-bold text-[11px] sm:text-xs">
                <Tag className="w-2.5 h-2.5" />
                DEVHOSTING30
              </span>
            </p>
            <button
              onClick={dismiss}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-black/20 transition-colors"
              aria-label="Fechar banner"
            >
              <X className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
