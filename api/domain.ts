import type { VercelRequest, VercelResponse } from "@vercel/node";

// RDAP endpoints por TLD (protocolo oficial ICANN - sem chave de API)
const RDAP_SERVERS: Record<string, string> = {
  // gTLDs via Verisign
  "com": "https://rdap.verisign.com/com/v1/domain/",
  "net": "https://rdap.verisign.com/net/v1/domain/",
  // Afilias / Identity Digital
  "org": "https://rdap.publicinterestregistry.org/rdap/domain/",
  "info": "https://rdap.afilias.net/rdap/domain/",
  "biz": "https://rdap.nic.biz/domain/",
  "io": "https://rdap.nic.io/domain/",
  "co": "https://rdap.nic.co/domain/",
  "app": "https://rdap.nic.google/domain/",
  "dev": "https://rdap.nic.google/domain/",
  "page": "https://rdap.nic.google/domain/",
  "online": "https://rdap.nic.online/domain/",
  "site": "https://rdap.nic.site/domain/",
  "store": "https://rdap.nic.store/domain/",
  "shop": "https://rdap.nic.shop/domain/",
  "tech": "https://rdap.nic.tech/domain/",
  "cloud": "https://rdap.nic.cloud/domain/",
  "digital": "https://rdap.nic.digital/domain/",
  "agency": "https://rdap.nic.agency/domain/",
  "studio": "https://rdap.nic.studio/domain/",
  "media": "https://rdap.nic.media/domain/",
  "blog": "https://rdap.nic.blog/domain/",
  "design": "https://rdap.nic.design/domain/",
  "email": "https://rdap.nic.email/domain/",
  "host": "https://rdap.nic.host/domain/",
  "website": "https://rdap.nic.website/domain/",
  // ccTLDs Brasileiros
  "com.br": "https://rdap.registro.br/domain/",
  "net.br": "https://rdap.registro.br/domain/",
  "org.br": "https://rdap.registro.br/domain/",
  "edu.br": "https://rdap.registro.br/domain/",
  "gov.br": "https://rdap.registro.br/domain/",
  "ind.br": "https://rdap.registro.br/domain/",
  "nom.br": "https://rdap.registro.br/domain/",
  "art.br": "https://rdap.registro.br/domain/",
  "tur.br": "https://rdap.registro.br/domain/",
  "inf.br": "https://rdap.registro.br/domain/",
  "adv.br": "https://rdap.registro.br/domain/",
  "arq.br": "https://rdap.registro.br/domain/",
  "eng.br": "https://rdap.registro.br/domain/",
  "med.br": "https://rdap.registro.br/domain/",
  "vet.br": "https://rdap.registro.br/domain/",
  // ccTLDs internacionais
  "us": "https://rdap.nic.us/domain/",
  "uk": "https://rdap.nominet.uk/domain/",
  "de": "https://rdap.denic.de/domain/",
  "fr": "https://rdap.nic.fr/domain/",
  "ca": "https://rdap.cira.ca/domain/",
  "au": "https://rdap.auda.org.au/domain/",
};

// Fallback RDAP via IANA bootstrap (funciona para qualquer TLD)
const RDAP_BOOTSTRAP = "https://rdap.org/domain/";

interface DomainCheckResult {
  domain: string;
  tld: string;
  available: boolean | null; // null = erro/desconhecido
  status: "available" | "taken" | "error" | "unknown";
  registrar?: string;
  expiresAt?: string;
  createdAt?: string;
}

async function checkDomainRDAP(fullDomain: string, tld: string): Promise<DomainCheckResult> {
  const rdapBase = RDAP_SERVERS[tld] || RDAP_BOOTSTRAP;
  const url = `${rdapBase}${fullDomain}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "Accept": "application/rdap+json, application/json",
        "User-Agent": "DevHosting-DomainSearch/1.0",
      },
    });

    clearTimeout(timeout);

    if (res.status === 404) {
      // 404 = domínio não registrado = DISPONÍVEL
      return {
        domain: fullDomain,
        tld,
        available: true,
        status: "available",
      };
    }

    if (res.status === 200) {
      // 200 = domínio registrado = INDISPONÍVEL
      let registrar: string | undefined;
      let expiresAt: string | undefined;
      let createdAt: string | undefined;

      try {
        const data = await res.json();

        // Extrair registrar
        if (data.entities) {
          const reg = data.entities.find((e: any) =>
            e.roles?.includes("registrar")
          );
          if (reg?.vcardArray) {
            const fn = reg.vcardArray[1]?.find((v: any) => v[0] === "fn");
            if (fn) registrar = fn[3];
          }
        }

        // Extrair datas
        if (data.events) {
          const exp = data.events.find((e: any) => e.eventAction === "expiration");
          const reg = data.events.find((e: any) => e.eventAction === "registration");
          if (exp) expiresAt = exp.eventDate;
          if (reg) createdAt = reg.eventDate;
        }
      } catch {
        // Ignorar erros de parse do JSON
      }

      return {
        domain: fullDomain,
        tld,
        available: false,
        status: "taken",
        registrar,
        expiresAt,
        createdAt,
      };
    }

    // Outros status (429 rate limit, 500 erro servidor, etc.)
    return {
      domain: fullDomain,
      tld,
      available: null,
      status: "unknown",
    };
  } catch (err: any) {
    if (err.name === "AbortError") {
      return { domain: fullDomain, tld, available: null, status: "error" };
    }
    return { domain: fullDomain, tld, available: null, status: "error" };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Suporta GET ?domain=meusite&tld=com.br ou POST { domain, tld } ou POST { domains: [{name, tld}] }
  let queries: Array<{ name: string; tld: string }> = [];

  if (req.method === "GET") {
    const { domain, tld } = req.query;
    if (!domain || !tld) {
      return res.status(400).json({ error: "Parâmetros 'domain' e 'tld' são obrigatórios" });
    }
    queries = [{ name: String(domain).toLowerCase(), tld: String(tld).toLowerCase() }];
  } else {
    const body = req.body;
    if (body.domains && Array.isArray(body.domains)) {
      queries = body.domains.slice(0, 20).map((d: any) => ({
        name: String(d.name || d.domain || "").toLowerCase().replace(/[^a-z0-9-]/g, ""),
        tld: String(d.tld || "").toLowerCase(),
      }));
    } else if (body.domain && body.tld) {
      queries = [{ name: String(body.domain).toLowerCase(), tld: String(body.tld).toLowerCase() }];
    } else {
      return res.status(400).json({ error: "Corpo inválido" });
    }
  }

  // Validar queries
  queries = queries.filter(q => q.name && q.tld && q.name.length >= 2);
  if (queries.length === 0) {
    return res.status(400).json({ error: "Nenhum domínio válido para verificar" });
  }

  // Verificar todos em paralelo
  const results = await Promise.all(
    queries.map(q => checkDomainRDAP(`${q.name}.${q.tld}`, q.tld))
  );

  return res.status(200).json({ results });
}
