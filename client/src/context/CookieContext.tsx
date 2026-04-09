/* DevHosting — CookieContext
   Sistema completo de gerenciamento de cookies estilo Hostinger
   Categorias: Essenciais, Funcionais, Analíticos, Marketing */

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type CookieCategory = "essential" | "functional" | "analytics" | "marketing";

export interface CookiePreferences {
  essential: boolean;   // sempre true, não pode desativar
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentState {
  status: "pending" | "accepted_all" | "declined_all" | "custom";
  preferences: CookiePreferences;
  timestamp: string | null;
  version: string;
}

interface CookieContextValue {
  consent: CookieConsentState;
  showBanner: boolean;
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  acceptAll: () => void;
  declineAll: () => void;
  saveCustom: (prefs: Partial<CookiePreferences>) => void;
  hasConsented: boolean;
  isAllowed: (category: CookieCategory) => boolean;
}

const STORAGE_KEY = "devhosting_cookie_consent_v2";
const CONSENT_VERSION = "2.0";

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  functional: false,
  analytics: false,
  marketing: false,
};

const DEFAULT_STATE: CookieConsentState = {
  status: "pending",
  preferences: DEFAULT_PREFERENCES,
  timestamp: null,
  version: CONSENT_VERSION,
};

const CookieContext = createContext<CookieContextValue | null>(null);

export function CookieProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsentState>(DEFAULT_STATE);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Carregar preferências salvas
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: CookieConsentState = JSON.parse(saved);
        // Verificar versão — se mudou, pedir novo consentimento
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed);
          setShowBanner(false);
          return;
        }
      }
    } catch {
      // ignorar erros de parse
    }
    // Mostrar banner após 1.5s se não houver consentimento
    const timer = setTimeout(() => setShowBanner(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const save = useCallback((state: CookieConsentState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setConsent(state);
    setShowBanner(false);
    setShowModal(false);
  }, []);

  const acceptAll = useCallback(() => {
    save({
      status: "accepted_all",
      preferences: { essential: true, functional: true, analytics: true, marketing: true },
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    });
  }, [save]);

  const declineAll = useCallback(() => {
    save({
      status: "declined_all",
      preferences: { essential: true, functional: false, analytics: false, marketing: false },
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    });
  }, [save]);

  const saveCustom = useCallback((prefs: Partial<CookiePreferences>) => {
    const merged: CookiePreferences = {
      ...DEFAULT_PREFERENCES,
      ...prefs,
      essential: true, // sempre obrigatório
    };
    save({
      status: "custom",
      preferences: merged,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    });
  }, [save]);

  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);

  const hasConsented = consent.status !== "pending";
  const isAllowed = useCallback(
    (category: CookieCategory) => consent.preferences[category] === true,
    [consent.preferences]
  );

  return (
    <CookieContext.Provider
      value={{ consent, showBanner, showModal, openModal, closeModal, acceptAll, declineAll, saveCustom, hasConsented, isAllowed }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies() {
  const ctx = useContext(CookieContext);
  if (!ctx) throw new Error("useCookies must be used within CookieProvider");
  return ctx;
}
