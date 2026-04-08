import { Router, Request, Response } from "express";

const router = Router();

// RDAP endpoints por TLD (protocolo oficial ICANN - sem chave de API)
const RDAP_SERVERS: Record<string, string> = {
  "com": "https://rdap.verisign.com/com/v1/domain/",
  "net": "https://rdap.verisign.com/net/v1/domain/",
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
  "us": "https://rdap.nic.us/domain/",
  "ca": "https://rdap.cira.ca/domain/",
  "de": "https://rdap.denic.de/domain/",
  "fr": "https://rdap.nic.fr/domain/",
};

const RDAP_BOOTSTRAP = "https://rdap.org/domain/";

async function checkDomainRDAP(fullDomain: string, tld: string) {
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
      redirect: "follow",
    });

    clearTimeout(timeout);

    if (res.status === 404) {
      return { domain: fullDomain, tld, available: true, status: "available" };
    }

    if (res.status === 200) {
      let registrar: string | undefined;
      let expiresAt: string | undefined;
      let createdAt: string | undefined;

      try {
        const data = await res.json();
        if (data.entities) {
          const reg = data.entities.find((e: any) => e.roles?.includes("registrar"));
          if (reg?.vcardArray) {
            const fn = reg.vcardArray[1]?.find((v: any) => v[0] === "fn");
            if (fn) registrar = fn[3];
          }
        }
        if (data.events) {
          const exp = data.events.find((e: any) => e.eventAction === "expiration");
          const reg = data.events.find((e: any) => e.eventAction === "registration");
          if (exp) expiresAt = exp.eventDate;
          if (reg) createdAt = reg.eventDate;
        }
      } catch { /* ignore */ }

      return { domain: fullDomain, tld, available: false, status: "taken", registrar, expiresAt, createdAt };
    }

    return { domain: fullDomain, tld, available: null, status: "unknown" };
  } catch (err: any) {
    if (err.name === "AbortError") {
      return { domain: fullDomain, tld, available: null, status: "error" };
    }
    return { domain: fullDomain, tld, available: null, status: "error" };
  }
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    let queries: Array<{ name: string; tld: string }> = [];

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

    queries = queries.filter(q => q.name && q.tld && q.name.length >= 2);
    if (queries.length === 0) {
      return res.status(400).json({ error: "Nenhum domínio válido" });
    }

    const results = await Promise.all(
      queries.map(q => checkDomainRDAP(`${q.name}.${q.tld}`, q.tld))
    );

    return res.json({ results });
  } catch (error: any) {
    console.error("Domain check error:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  const { domain, tld } = req.query;
  if (!domain || !tld) {
    return res.status(400).json({ error: "Parâmetros 'domain' e 'tld' são obrigatórios" });
  }
  const result = await checkDomainRDAP(
    `${String(domain).toLowerCase()}.${String(tld).toLowerCase()}`,
    String(tld).toLowerCase()
  );
  return res.json({ results: [result] });
});

export default router;
