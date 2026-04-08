// =============================================================================
// domainUtils.ts — Verificação REAL de domínios via RDAP (ICANN)
// Chama /api/domain que consulta os servidores RDAP oficiais:
//   HTTP 200 = domínio registrado (indisponível)
//   HTTP 404 = domínio livre (disponível)
// =============================================================================

export interface TLDInfo {
  ext: string;
  tld: string;          // sem ponto
  price: number;
  renewPrice: number;
  category: "popular" | "business" | "tech" | "br" | "generic";
  badge?: string;
  transferPrice?: number;
}

export const ALL_TLDS: TLDInfo[] = [
  // === BRASIL ===
  { ext: ".com.br",  tld: "com.br",  price: 39.90,  renewPrice: 39.90,  category: "br",       badge: "BR Popular" },
  { ext: ".net.br",  tld: "net.br",  price: 39.90,  renewPrice: 39.90,  category: "br" },
  { ext: ".org.br",  tld: "org.br",  price: 39.90,  renewPrice: 39.90,  category: "br" },
  { ext: ".ind.br",  tld: "ind.br",  price: 39.90,  renewPrice: 39.90,  category: "br" },
  { ext: ".nom.br",  tld: "nom.br",  price: 39.90,  renewPrice: 39.90,  category: "br" },
  { ext: ".art.br",  tld: "art.br",  price: 39.90,  renewPrice: 39.90,  category: "br" },
  { ext: ".tur.br",  tld: "tur.br",  price: 39.90,  renewPrice: 39.90,  category: "br" },
  { ext: ".inf.br",  tld: "inf.br",  price: 39.90,  renewPrice: 39.90,  category: "br" },
  { ext: ".adv.br",  tld: "adv.br",  price: 39.90,  renewPrice: 39.90,  category: "br" },
  { ext: ".eng.br",  tld: "eng.br",  price: 39.90,  renewPrice: 39.90,  category: "br" },
  { ext: ".med.br",  tld: "med.br",  price: 39.90,  renewPrice: 39.90,  category: "br" },
  { ext: ".vet.br",  tld: "vet.br",  price: 39.90,  renewPrice: 39.90,  category: "br" },
  { ext: ".arq.br",  tld: "arq.br",  price: 39.90,  renewPrice: 39.90,  category: "br" },
  // === POPULARES ===
  { ext: ".com",     tld: "com",     price: 49.90,  renewPrice: 59.90,  category: "popular",  badge: "Mais Popular" },
  { ext: ".net",     tld: "net",     price: 44.90,  renewPrice: 54.90,  category: "popular" },
  { ext: ".org",     tld: "org",     price: 44.90,  renewPrice: 54.90,  category: "popular" },
  { ext: ".info",    tld: "info",    price: 39.90,  renewPrice: 79.90,  category: "popular",  badge: "Oferta" },
  { ext: ".biz",     tld: "biz",     price: 44.90,  renewPrice: 54.90,  category: "popular" },
  { ext: ".co",      tld: "co",      price: 79.90,  renewPrice: 89.90,  category: "popular" },
  // === TECH ===
  { ext: ".io",      tld: "io",      price: 149.90, renewPrice: 159.90, category: "tech",     badge: "Startups" },
  { ext: ".dev",     tld: "dev",     price: 69.90,  renewPrice: 79.90,  category: "tech",     badge: "Devs" },
  { ext: ".app",     tld: "app",     price: 69.90,  renewPrice: 79.90,  category: "tech" },
  { ext: ".tech",    tld: "tech",    price: 79.90,  renewPrice: 89.90,  category: "tech" },
  { ext: ".cloud",   tld: "cloud",   price: 69.90,  renewPrice: 79.90,  category: "tech" },
  { ext: ".digital", tld: "digital", price: 69.90,  renewPrice: 79.90,  category: "tech" },
  { ext: ".host",    tld: "host",    price: 99.90,  renewPrice: 109.90, category: "tech" },
  { ext: ".page",    tld: "page",    price: 49.90,  renewPrice: 59.90,  category: "tech" },
  // === NEGÓCIOS ===
  { ext: ".store",   tld: "store",   price: 59.90,  renewPrice: 99.90,  category: "business", badge: "E-commerce" },
  { ext: ".shop",    tld: "shop",    price: 69.90,  renewPrice: 89.90,  category: "business" },
  { ext: ".online",  tld: "online",  price: 39.90,  renewPrice: 89.90,  category: "business", badge: "Oferta" },
  { ext: ".site",    tld: "site",    price: 39.90,  renewPrice: 89.90,  category: "business", badge: "Oferta" },
  { ext: ".agency",  tld: "agency",  price: 79.90,  renewPrice: 89.90,  category: "business" },
  { ext: ".media",   tld: "media",   price: 79.90,  renewPrice: 89.90,  category: "business" },
  { ext: ".email",   tld: "email",   price: 49.90,  renewPrice: 59.90,  category: "business" },
  { ext: ".website", tld: "website", price: 39.90,  renewPrice: 79.90,  category: "business" },
  // === GENÉRICOS ===
  { ext: ".studio",  tld: "studio",  price: 79.90,  renewPrice: 89.90,  category: "generic" },
  { ext: ".design",  tld: "design",  price: 79.90,  renewPrice: 89.90,  category: "generic" },
  { ext: ".blog",    tld: "blog",    price: 49.90,  renewPrice: 59.90,  category: "generic" },
  { ext: ".us",      tld: "us",      price: 44.90,  renewPrice: 54.90,  category: "generic" },
  { ext: ".ca",      tld: "ca",      price: 44.90,  renewPrice: 54.90,  category: "generic" },
  { ext: ".de",      tld: "de",      price: 29.90,  renewPrice: 39.90,  category: "generic" },
];

// Mapa rápido TLD (sem ponto) -> info
export const TLD_MAP: Record<string, TLDInfo> = Object.fromEntries(
  ALL_TLDS.map(t => [t.tld, t])
);

export type AvailabilityStatus = "available" | "taken" | "premium" | "loading" | "error" | "unknown";

export interface DomainResult {
  domain: string;
  tld: string;
  fullDomain: string;
  status: AvailabilityStatus;
  price: number;
  renewPrice: number;
  badge?: string;
  isPremium?: boolean;
  premiumPrice?: number;
  registrar?: string;
  expiresAt?: string;
  createdAt?: string;
}

// Sanitizar nome: remover acentos, manter apenas a-z0-9-
function sanitizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

// Verificação REAL de disponibilidade via API /api/domain (RDAP)
export async function checkDomainAvailability(
  name: string,
  tlds: TLDInfo[]
): Promise<DomainResult[]> {
  const cleanName = sanitizeName(name);
  if (!cleanName || cleanName.length < 2) return [];

  const domains = tlds.map(t => ({ name: cleanName, tld: t.tld }));

  try {
    const response = await fetch("/api/domain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domains }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return data.results.map((r: any) => {
      const tldInfo = TLD_MAP[r.tld] || tlds.find(t => t.tld === r.tld);
      const price = tldInfo?.price ?? 49.90;
      const renewPrice = tldInfo?.renewPrice ?? 59.90;
      const badge = tldInfo?.badge;

      return {
        domain: cleanName,
        tld: `.${r.tld}`,
        fullDomain: r.domain,
        status: r.status as AvailabilityStatus,
        price,
        renewPrice,
        badge,
        isPremium: false,
        registrar: r.registrar,
        expiresAt: r.expiresAt,
        createdAt: r.createdAt,
      } as DomainResult;
    });
  } catch (err) {
    console.error("Erro ao verificar domínios:", err);
    // Fallback: retornar erro para todos
    return tlds.map(tldInfo => ({
      domain: cleanName,
      tld: tldInfo.ext,
      fullDomain: `${cleanName}${tldInfo.ext}`,
      status: "error" as AvailabilityStatus,
      price: tldInfo.price,
      renewPrice: tldInfo.renewPrice,
      badge: tldInfo.badge,
      isPremium: false,
    }));
  }
}

// Gerar sugestões inteligentes de nomes alternativos
export function generateSuggestions(name: string): string[] {
  const clean = sanitizeName(name);
  if (!clean) return [];

  const prefixes = ["get", "try", "use", "my", "the", "go", "pro", "top", "fast", "best"];
  const suffixes = ["app", "hq", "hub", "io", "lab", "tech", "dev", "br", "online", "digital"];

  const suggestions: string[] = [];
  prefixes.slice(0, 5).forEach(p => {
    const s = `${p}${clean}`;
    if (s.length <= 30) suggestions.push(s);
  });
  suffixes.slice(0, 5).forEach(s => {
    const sug = `${clean}${s}`;
    if (sug.length <= 30) suggestions.push(sug);
  });

  return suggestions.sort(() => Math.random() - 0.5).slice(0, 6);
}

// Parse da entrada do usuário
export function parseDomainInput(input: string): { name: string; tld: string | null } {
  const trimmed = input.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/$/, "");

  if (trimmed.includes(".")) {
    // Tentar casar com TLDs conhecidos (do mais longo para o mais curto)
    const sortedTlds = ALL_TLDS.map(t => t.tld).sort((a, b) => b.length - a.length);
    for (const tld of sortedTlds) {
      if (trimmed.endsWith(`.${tld}`)) {
        const namePart = trimmed.slice(0, -(tld.length + 1));
        if (namePart.length >= 1) return { name: namePart, tld };
      }
    }
    const lastDot = trimmed.lastIndexOf(".");
    return { name: trimmed.slice(0, lastDot), tld: trimmed.slice(lastDot + 1) };
  }

  return { name: trimmed, tld: null };
}
