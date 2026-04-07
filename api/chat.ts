import type { VercelRequest, VercelResponse } from "@vercel/node";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const DEVHOSTING_INFO = `
ABOUT DEVHOSTING:
- Premium hosting company focused on security and performance
- Founder: Italo Caetano Pires Leão — Google Cybersecurity Certificate (Coursera/Google, Jan/2024)
- Infrastructure: Hetzner and OVH servers with 99.9% uptime
- Support: 24/7 via AI chat on the website
- Differentiator: Google-level security, high-quality technical support

HOSTING PLANS:
1. Starter — R$9.90/mo (annual) or R$14.90/mo | $2.00/mo (annual) or $3.00/mo
   - 10 GB SSD, 1 site, free SSL, 5 emails, 24/7 support
2. Pro — R$24.90/mo (annual) or R$34.90/mo | $5.00/mo (annual) or $7.00/mo — MOST POPULAR
   - 50 GB SSD, unlimited sites, free SSL, unlimited emails, daily backups, global CDN
3. Business — R$49.90/mo (annual) or R$69.90/mo | $10.00/mo (annual) or $14.00/mo
   - 200 GB SSD, unlimited sites, free SSL, unlimited emails, daily backups, global CDN, dedicated IP, priority support

VPS PLANS:
1. VPS Starter — R$49.90/mo | $10/mo: 2 vCPU, 4 GB RAM, 80 GB SSD NVMe, 4 TB traffic
2. VPS Pro — R$99.90/mo | $20/mo: 4 vCPU, 8 GB RAM, 160 GB SSD NVMe, 8 TB traffic — MOST POPULAR
3. VPS Ultra — R$199.90/mo | $40/mo: 8 vCPU, 16 GB RAM, 320 GB SSD NVMe, unlimited traffic

DOMAINS:
- Registration from R$39.90/year | $8/year
- Extensions: .com.br, .com, .net, .org, .io, .dev and others
- Domain transfer available

ACCEPTED PAYMENTS:
- Cryptocurrencies: Bitcoin (BTC), Ethereum (ETH), USDT, Litecoin (LTC), BNB
- International cards via Stripe
- Pix (Brazilian instant payment)
- Currencies: BRL, USD, EUR and cryptocurrencies

SECURITY:
- DDoS Protection active on all plans
- Free SSL/TLS on all plans
- Managed firewall
- Automatic daily backups (Pro plans and above)
- 24/7 monitoring
- Founder's Google Cybersecurity certification guarantees elite security practices
`;

const LANGUAGE_INSTRUCTIONS: Record<string, string> = {
  pt: `Você é o assistente virtual da DevHosting. SEMPRE responda em português brasileiro, independentemente do idioma da pergunta. Seja direto, amigável e profissional. Foque em ajudar o cliente a escolher o melhor plano. Não invente informações. Máximo de 3 parágrafos por resposta. Use emojis com moderação.`,
  en: `You are DevHosting's virtual assistant. ALWAYS respond in English, regardless of the language of the question. Be direct, friendly and professional. Focus on helping the customer choose the best plan. Do not invent information. Maximum 3 paragraphs per response. Use emojis sparingly.`,
  es: `Eres el asistente virtual de DevHosting. SIEMPRE responde en español, independientemente del idioma de la pregunta. Sé directo, amigable y profesional. Enfócate en ayudar al cliente a elegir el mejor plan. No inventes información. Máximo 3 párrafos por respuesta. Usa emojis con moderación.`,
  ru: `Вы виртуальный помощник DevHosting. ВСЕГДА отвечайте на русском языке, независимо от языка вопроса. Будьте прямыми, дружелюбными и профессиональными. Сосредоточьтесь на помощи клиенту в выборе лучшего плана. Не придумывайте информацию. Максимум 3 абзаца на ответ. Используйте эмодзи умеренно.`,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const { messages, lang } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages." });
    }

    const language = lang && LANGUAGE_INSTRUCTIONS[lang] ? lang : "pt";
    const systemPrompt = `${LANGUAGE_INSTRUCTIONS[language]}\n\n${DEVHOSTING_INFO}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.slice(-10),
      ],
      max_tokens: 512,
      temperature: 0.7,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Sorry, I could not process your message. Please try again.";

    return res.status(200).json({ reply });
  } catch (error: unknown) {
    console.error("Chat AI error:", error);
    return res.status(500).json({ error: "Internal error. Please try again shortly." });
  }
}
