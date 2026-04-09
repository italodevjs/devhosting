/* DevHosting — CookieBanner v2
   Banner de consentimento de cookies estilo Hostinger
   Com botões: Aceitar todos / Personalizar / Rejeitar */

import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Settings2, X } from "lucide-react";
import { useCookies } from "../context/CookieContext";

export default function CookieBanner() {
  const { showBanner, acceptAll, declineAll, openModal } = useCookies();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div
            className="max-w-4xl mx-auto rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #131313 100%)" }}
          >
            {/* Linha decorativa âmbar no topo */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />

            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Ícone + Texto */}
                <div className="flex gap-3 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Cookie className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-white font-bold text-sm sm:text-base mb-1"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      Sua privacidade é importante para nós
                    </h3>
                    <p className="text-white/45 text-xs sm:text-sm leading-relaxed">
                      Usamos cookies essenciais para o funcionamento do site e, com sua permissão, cookies opcionais para
                      melhorar sua experiência, analisar o tráfego e personalizar anúncios. Você pode escolher quais
                      categorias aceitar ou{" "}
                      <button
                        onClick={openModal}
                        className="text-amber-400 hover:underline font-medium"
                      >
                        personalizar suas preferências
                      </button>
                      .{" "}
                      <a href="/cookies" className="text-amber-400/70 hover:text-amber-400 hover:underline">
                        Saiba mais
                      </a>
                    </p>
                  </div>
                </div>

                {/* Botão fechar (mobile) */}
                <button
                  onClick={declineAll}
                  className="absolute top-4 right-4 sm:hidden w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Botões de ação */}
              <div className="flex flex-col xs:flex-row gap-2 mt-4 sm:mt-5">
                <button
                  onClick={declineAll}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-white/10 text-white/45 text-xs sm:text-sm font-medium hover:border-white/20 hover:text-white/60 transition-colors"
                >
                  Rejeitar todos
                </button>
                <button
                  onClick={openModal}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-white/15 text-white/70 text-xs sm:text-sm font-medium hover:border-amber-400/30 hover:text-amber-400 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  Personalizar
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 py-2.5 px-4 rounded-xl shimmer text-black text-xs sm:text-sm font-bold"
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  Aceitar todos
                </button>
              </div>

              {/* Nota LGPD */}
              <p className="text-white/20 text-xs text-center mt-3">
                Em conformidade com a LGPD (Lei nº 13.709/2018) e GDPR
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
