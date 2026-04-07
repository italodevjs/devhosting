/* DevHosting — Contato */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function Contact() {
  const { lang } = useLang();

  const content = {
    pt: {
      title: "Contato",
      subtitle: "Estamos disponíveis 24/7 para ajudar você.",
      channels: [
        { icon: <MessageCircle className="w-5 h-5" />, title: "Chat com IA", desc: "Suporte instantâneo via chat no site. Disponível 24/7.", action: "Abrir chat", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
        { icon: <Mail className="w-5 h-5" />, title: "E-mail", desc: "contato@devhosting.com.br", action: "Enviar e-mail", href: "mailto:contato@devhosting.com.br", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
        { icon: <Clock className="w-5 h-5" />, title: "Horário de Atendimento", desc: "Suporte humano: Seg–Sex 9h–18h (BRT). IA: 24/7.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
        { icon: <MapPin className="w-5 h-5" />, title: "Localização", desc: "Brasil — Servidores no Brasil, EUA e Europa.", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
      ],
      departments: [
        { name: "Suporte Técnico", email: "suporte@devhosting.com.br" },
        { name: "Financeiro / Faturamento", email: "financeiro@devhosting.com.br" },
        { name: "Privacidade / LGPD", email: "privacidade@devhosting.com.br" },
        { name: "Parcerias", email: "parcerias@devhosting.com.br" },
        { name: "SLA / Créditos", email: "sla@devhosting.com.br" },
      ],
      deptTitle: "Contatos por Departamento",
    },
    en: {
      title: "Contact",
      subtitle: "We're available 24/7 to help you.",
      channels: [
        { icon: <MessageCircle className="w-5 h-5" />, title: "AI Chat", desc: "Instant support via website chat. Available 24/7.", action: "Open chat", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
        { icon: <Mail className="w-5 h-5" />, title: "Email", desc: "contato@devhosting.com.br", action: "Send email", href: "mailto:contato@devhosting.com.br", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
        { icon: <Clock className="w-5 h-5" />, title: "Business Hours", desc: "Human support: Mon–Fri 9am–6pm (BRT). AI: 24/7.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
        { icon: <MapPin className="w-5 h-5" />, title: "Location", desc: "Brazil — Servers in Brazil, USA and Europe.", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
      ],
      departments: [
        { name: "Technical Support", email: "suporte@devhosting.com.br" },
        { name: "Finance / Billing", email: "financeiro@devhosting.com.br" },
        { name: "Privacy / GDPR", email: "privacidade@devhosting.com.br" },
        { name: "Partnerships", email: "parcerias@devhosting.com.br" },
        { name: "SLA / Credits", email: "sla@devhosting.com.br" },
      ],
      deptTitle: "Department Contacts",
    },
    es: {
      title: "Contacto",
      subtitle: "Estamos disponibles 24/7 para ayudarte.",
      channels: [
        { icon: <MessageCircle className="w-5 h-5" />, title: "Chat con IA", desc: "Soporte instantáneo vía chat. Disponible 24/7.", action: "Abrir chat", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
        { icon: <Mail className="w-5 h-5" />, title: "Correo electrónico", desc: "contato@devhosting.com.br", action: "Enviar correo", href: "mailto:contato@devhosting.com.br", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
        { icon: <Clock className="w-5 h-5" />, title: "Horario de Atención", desc: "Soporte humano: Lun–Vie 9h–18h (BRT). IA: 24/7.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
        { icon: <MapPin className="w-5 h-5" />, title: "Ubicación", desc: "Brasil — Servidores en Brasil, EE.UU. y Europa.", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
      ],
      departments: [
        { name: "Soporte Técnico", email: "suporte@devhosting.com.br" },
        { name: "Finanzas / Facturación", email: "financeiro@devhosting.com.br" },
        { name: "Privacidad / RGPD", email: "privacidade@devhosting.com.br" },
        { name: "Asociaciones", email: "parcerias@devhosting.com.br" },
        { name: "SLA / Créditos", email: "sla@devhosting.com.br" },
      ],
      deptTitle: "Contactos por Departamento",
    },
    ru: {
      title: "Контакты",
      subtitle: "Мы доступны 24/7, чтобы помочь вам.",
      channels: [
        { icon: <MessageCircle className="w-5 h-5" />, title: "Чат с ИИ", desc: "Мгновенная поддержка через чат на сайте. Доступно 24/7.", action: "Открыть чат", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
        { icon: <Mail className="w-5 h-5" />, title: "Электронная почта", desc: "contato@devhosting.com.br", action: "Написать письмо", href: "mailto:contato@devhosting.com.br", color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
        { icon: <Clock className="w-5 h-5" />, title: "Часы работы", desc: "Поддержка: Пн–Пт 9:00–18:00 (BRT). ИИ: 24/7.", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
        { icon: <MapPin className="w-5 h-5" />, title: "Расположение", desc: "Бразилия — серверы в Бразилии, США и Европе.", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
      ],
      departments: [
        { name: "Техническая поддержка", email: "suporte@devhosting.com.br" },
        { name: "Финансы / Выставление счетов", email: "financeiro@devhosting.com.br" },
        { name: "Конфиденциальность / GDPR", email: "privacidade@devhosting.com.br" },
        { name: "Партнёрства", email: "parcerias@devhosting.com.br" },
        { name: "SLA / Кредиты", email: "sla@devhosting.com.br" },
      ],
      deptTitle: "Контакты по отделам",
    },
  };

  const c = content[lang] || content.pt;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-3xl py-16">
        <Link href="/">
          <motion.div
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-white/40 hover:text-amber-400 transition-colors mb-10 cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Voltar ao início</span>
          </motion.div>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black text-white mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>{c.title}</h1>
          <p className="text-white/40 mb-12">{c.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {c.channels.map((ch, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card rounded-xl border ${ch.border} ${ch.bg} p-5`}
            >
              <div className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mb-3 ${ch.color}`}>
                {ch.icon}
              </div>
              <h3 className="font-bold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{ch.title}</h3>
              <p className="text-sm text-white/50">{ch.desc}</p>
              {ch.href && (
                <a href={ch.href} className={`text-xs mt-3 inline-block ${ch.color} hover:opacity-80 transition-opacity`}>
                  {ch.action} →
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card rounded-xl border border-white/6 overflow-hidden"
        >
          <div className="p-5 border-b border-white/6">
            <h2 className="font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{c.deptTitle}</h2>
          </div>
          {c.departments.map((dept, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4 border-b border-white/4 last:border-0 hover:bg-white/2 transition-colors">
              <span className="text-sm text-white/60">{dept.name}</span>
              <a href={`mailto:${dept.email}`} className="text-sm text-amber-400 hover:text-amber-300 transition-colors font-mono-data">
                {dept.email}
              </a>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
