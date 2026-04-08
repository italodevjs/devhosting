/* DevHosting — FAQ
   Real hosting questions with accordion */

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    q: "O que está incluído no SSL grátis?",
    a: "Todos os planos incluem certificados SSL/TLS via Let's Encrypt, ativados automaticamente em até 5 minutos após o cadastro do domínio. Planos Pro e Business incluem também SSL Wildcard (*.seudominio.com), cobrindo todos os subdomínios sem custo adicional.",
  },
  {
    q: "Vocês fazem migração gratuita do meu site atual?",
    a: "Sim. Oferecemos migração gratuita para clientes que estão migrando de outro provedor. Basta abrir um chamado com as credenciais do servidor atual e nossa equipe realiza a migração completa — arquivos, banco de dados e e-mails — sem downtime.",
  },
  {
    q: "Qual é a política de backup?",
    a: "Planos Pro e Business incluem backup diário automático com retenção de 30 dias e restauração em 1 clique pelo painel. O plano Starter não inclui backup automático, mas você pode fazer backups manuais via cPanel a qualquer momento.",
  },
  {
    q: "O que acontece se meu site ultrapassar o limite de banda?",
    a: "Todos os planos incluem largura de banda ilimitada para tráfego de sites normais. Não aplicamos throttling ou cobranças extras por tráfego. Em casos de abuso (ex: distribuição de arquivos pesados ou DDoS), reservamos o direito de suspender temporariamente o serviço.",
  },
  {
    q: "Posso hospedar múltiplos sites no mesmo plano?",
    a: "No plano Starter você pode hospedar 1 site. Nos planos Pro e Business você pode hospedar sites ilimitados, cada um com seu próprio domínio, banco de dados e e-mails.",
  },
  {
    q: "Quais formas de pagamento são aceitas?",
    a: "Aceitamos Pix, cartão de crédito/débito via Stripe, Bitcoin (BTC), Ethereum (ETH), USDT (Tether) e PayPal. Pagamentos em criptomoedas são processados automaticamente e confirmados em minutos.",
  },
  {
    q: "Existe contrato de fidelidade?",
    a: "Não. Todos os planos são sem fidelidade. Você pode cancelar a qualquer momento pelo painel. Oferecemos reembolso proporcional nos primeiros 30 dias para novos clientes.",
  },
  {
    q: "Como funciona o suporte 24/7 via IA?",
    a: "Nosso assistente de IA (baseado em LLaMA 3 via Groq) está disponível 24 horas por dia, 7 dias por semana, diretamente no site. Ele responde dúvidas técnicas, auxilia na configuração de DNS, cPanel, SSL e muito mais. Para casos complexos, escala automaticamente para nossa equipe humana.",
  },
  {
    q: "Qual é o SLA de uptime garantido?",
    a: "Garantimos 99.9% de uptime mensal para todos os planos. Caso o uptime fique abaixo disso por falha nossa, você recebe créditos proporcionais na próxima fatura. Consulte nossa página /sla para os detalhes completos.",
  },
  {
    q: "Posso usar o cPanel para gerenciar meu servidor?",
    a: "Sim. Todos os planos de hospedagem compartilhada incluem acesso ao cPanel. Planos Pro e Business incluem também acesso SSH. Os planos VPS oferecem acesso root completo com painel WHM opcional.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-amber-400 border border-amber-400/20 bg-amber-400/5 uppercase tracking-widest mb-4">
            Dúvidas Frequentes
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-4" style={{ fontFamily: "Syne, sans-serif" }}>
            Perguntas{" "}
            <span className="gradient-text">frequentes</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            Tudo que você precisa saber antes de contratar. Não encontrou sua dúvida?{" "}
            <a href="/contato" className="text-amber-400 hover:underline">
              Fale conosco
            </a>
            .
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass-card rounded-xl border border-white/8 px-6 hover:border-white/15 transition-colors"
              >
                <AccordionTrigger className="text-white font-semibold text-left hover:no-underline py-5 gap-4">
                  <span className="flex items-start gap-3">
                    <HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-white/60 text-sm leading-relaxed pb-5 pl-7">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
