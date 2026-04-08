// Simulated domain availability engine
// In production, this would call a WHOIS/RDAP API

export interface TLDInfo {
  ext: string;
  price: number;
  renewPrice: number;
  category: "popular" | "business" | "tech" | "br" | "generic";
  badge?: string;
  transferPrice?: number;
}

export const ALL_TLDS: TLDInfo[] = [
  // BR
  { ext: ".com.br", price: 39.90, renewPrice: 39.90, category: "br", badge: "BR Popular" },
  { ext: ".net.br", price: 39.90, renewPrice: 39.90, category: "br" },
  { ext: ".org.br", price: 39.90, renewPrice: 39.90, category: "br" },
  { ext: ".edu.br", price: 29.90, renewPrice: 29.90, category: "br" },
  // Global popular
  { ext: ".com", price: 59.90, renewPrice: 69.90, category: "popular", badge: "Mais Popular" },
  { ext: ".net", price: 54.90, renewPrice: 59.90, category: "popular" },
  { ext: ".org", price: 54.90, renewPrice: 59.90, category: "popular" },
  { ext: ".info", price: 49.90, renewPrice: 54.90, category: "popular" },
  // Tech
  { ext: ".io", price: 129.90, renewPrice: 139.90, category: "tech", badge: "Startups" },
  { ext: ".dev", price: 89.90, renewPrice: 99.90, category: "tech", badge: "Devs" },
  { ext: ".app", price: 89.90, renewPrice: 99.90, category: "tech" },
  { ext: ".tech", price: 99.90, renewPrice: 109.90, category: "tech" },
  { ext: ".cloud", price: 79.90, renewPrice: 89.90, category: "tech" },
  { ext: ".digital", price: 89.90, renewPrice: 99.90, category: "tech" },
  { ext: ".software", price: 99.90, renewPrice: 109.90, category: "tech" },
  { ext: ".codes", price: 109.90, renewPrice: 119.90, category: "tech" },
  // Business
  { ext: ".store", price: 79.90, renewPrice: 89.90, category: "business", badge: "E-commerce" },
  { ext: ".shop", price: 79.90, renewPrice: 89.90, category: "business" },
  { ext: ".business", price: 69.90, renewPrice: 79.90, category: "business" },
  { ext: ".company", price: 69.90, renewPrice: 79.90, category: "business" },
  { ext: ".agency", price: 89.90, renewPrice: 99.90, category: "business" },
  { ext: ".solutions", price: 89.90, renewPrice: 99.90, category: "business" },
  // Generic
  { ext: ".online", price: 59.90, renewPrice: 69.90, category: "generic" },
  { ext: ".site", price: 59.90, renewPrice: 69.90, category: "generic" },
  { ext: ".website", price: 49.90, renewPrice: 59.90, category: "generic" },
  { ext: ".blog", price: 69.90, renewPrice: 79.90, category: "generic" },
  { ext: ".media", price: 89.90, renewPrice: 99.90, category: "generic" },
  { ext: ".studio", price: 89.90, renewPrice: 99.90, category: "generic" },
];

// Deterministic "availability" based on domain name hash
// Makes results consistent for the same domain
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Always-unavailable domains (common ones)
const ALWAYS_TAKEN = ["google", "facebook", "amazon", "microsoft", "apple", "netflix", "youtube", "twitter", "instagram", "whatsapp", "github", "gitlab", "vercel", "cloudflare"];

export type AvailabilityStatus = "available" | "taken" | "premium" | "loading";

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
}

export async function checkDomainAvailability(
  name: string,
  tlds: TLDInfo[]
): Promise<DomainResult[]> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

  const cleanName = name.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/^-+|-+$/g, "");

  return tlds.map((tld) => {
    const fullDomain = `${cleanName}${tld.ext}`;
    const hash = hashString(fullDomain);

    let status: AvailabilityStatus;

    if (ALWAYS_TAKEN.includes(cleanName)) {
      status = "taken";
    } else if (cleanName.length <= 3 && hash % 3 === 0) {
      // Short domains are often premium
      status = "premium";
    } else {
      // ~65% available, ~35% taken
      status = hash % 10 < 7 ? "available" : "taken";
    }

    const isPremium = status === "premium";

    return {
      domain: cleanName,
      tld: tld.ext,
      fullDomain,
      status,
      price: tld.price,
      renewPrice: tld.renewPrice,
      badge: tld.badge,
      isPremium,
      premiumPrice: isPremium ? tld.price * 5 : undefined,
    };
  });
}

// Generate smart suggestions based on the searched name
export function generateSuggestions(name: string): string[] {
  const clean = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const suggestions: string[] = [];

  // Prefixes/suffixes
  const prefixes = ["get", "try", "use", "my", "the", "go", "pro"];
  const suffixes = ["app", "hq", "hub", "io", "lab", "tech", "dev", "br"];

  prefixes.forEach((p) => suggestions.push(`${p}${clean}`));
  suffixes.forEach((s) => suggestions.push(`${clean}${s}`));

  // Shuffle and take top 6
  return suggestions.sort(() => Math.random() - 0.5).slice(0, 6);
}

export function parseDomainInput(input: string): { name: string; tld: string | null } {
  const trimmed = input.trim().toLowerCase();
  const dotIndex = trimmed.indexOf(".");
  if (dotIndex === -1) {
    return { name: trimmed, tld: null };
  }
  return {
    name: trimmed.slice(0, dotIndex),
    tld: trimmed.slice(dotIndex),
  };
}
