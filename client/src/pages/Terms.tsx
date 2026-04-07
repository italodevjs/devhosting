/* DevHosting — Termos de Uso */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, FileText } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function Terms() {
  const { lang } = useLang();

  const content = {
    pt: {
      title: "Termos de Uso",
      updated: "Última atualização: 01 de janeiro de 2025",
      sections: [
        {
          title: "1. Aceitação dos Termos",
          text: "Ao acessar e utilizar os serviços da DevHosting, você concorda com estes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize nossos serviços.",
        },
        {
          title: "2. Serviços Oferecidos",
          text: "A DevHosting oferece serviços de hospedagem de sites, VPS (Servidor Virtual Privado), registro de domínios e serviços relacionados. Todos os serviços estão sujeitos à disponibilidade e às políticas vigentes.",
        },
        {
          title: "3. Responsabilidades do Cliente",
          text: "O cliente é responsável por todo o conteúdo hospedado em nossa infraestrutura. É proibido hospedar conteúdo ilegal, spam, malware, ou qualquer material que viole direitos de terceiros ou leis aplicáveis.",
        },
        {
          title: "4. Pagamentos e Reembolsos",
          text: "Os pagamentos são processados de forma segura via Stripe, Pix ou criptomoedas. Planos mensais podem ser cancelados a qualquer momento. Reembolsos são analisados caso a caso dentro de 7 dias após a contratação.",
        },
        {
          title: "5. Uptime e SLA",
          text: "A DevHosting garante 99,9% de uptime mensal. Em caso de indisponibilidade superior ao SLA, o cliente receberá crédito proporcional ao tempo de inatividade.",
        },
        {
          title: "6. Rescisão",
          text: "A DevHosting reserva o direito de suspender ou encerrar contas que violem estes termos, sem aviso prévio em casos graves. O cliente será notificado por e-mail em situações não urgentes.",
        },
        {
          title: "7. Limitação de Responsabilidade",
          text: "A DevHosting não se responsabiliza por perdas de dados decorrentes de falhas do cliente, ataques externos ou casos de força maior. Recomendamos que os clientes mantenham backups independentes.",
        },
        {
          title: "8. Alterações nos Termos",
          text: "Estes termos podem ser atualizados a qualquer momento. O cliente será notificado por e-mail sobre mudanças significativas com 30 dias de antecedência.",
        },
        {
          title: "9. Contato",
          text: "Dúvidas sobre estes termos: contato@devhosting.com.br",
        },
      ],
    },
    en: {
      title: "Terms of Service",
      updated: "Last updated: January 1, 2025",
      sections: [
        { title: "1. Acceptance of Terms", text: "By accessing and using DevHosting services, you agree to these Terms of Service. If you do not agree with any part of these terms, do not use our services." },
        { title: "2. Services Offered", text: "DevHosting offers web hosting, VPS (Virtual Private Server), domain registration and related services. All services are subject to availability and current policies." },
        { title: "3. Client Responsibilities", text: "The client is responsible for all content hosted on our infrastructure. It is prohibited to host illegal content, spam, malware, or any material that violates third-party rights or applicable laws." },
        { title: "4. Payments and Refunds", text: "Payments are processed securely via Stripe, Pix or cryptocurrencies. Monthly plans can be cancelled at any time. Refunds are analyzed case by case within 7 days of purchase." },
        { title: "5. Uptime and SLA", text: "DevHosting guarantees 99.9% monthly uptime. In case of unavailability exceeding the SLA, the client will receive credit proportional to the downtime." },
        { title: "6. Termination", text: "DevHosting reserves the right to suspend or terminate accounts that violate these terms, without prior notice in serious cases." },
        { title: "7. Limitation of Liability", text: "DevHosting is not responsible for data loss resulting from client failures, external attacks or force majeure. We recommend clients maintain independent backups." },
        { title: "8. Changes to Terms", text: "These terms may be updated at any time. Clients will be notified by email about significant changes with 30 days notice." },
        { title: "9. Contact", text: "Questions about these terms: contato@devhosting.com.br" },
      ],
    },
    es: {
      title: "Términos de Servicio",
      updated: "Última actualización: 1 de enero de 2025",
      sections: [
        { title: "1. Aceptación de Términos", text: "Al acceder y utilizar los servicios de DevHosting, aceptas estos Términos de Servicio." },
        { title: "2. Servicios Ofrecidos", text: "DevHosting ofrece alojamiento web, VPS, registro de dominios y servicios relacionados." },
        { title: "3. Responsabilidades del Cliente", text: "El cliente es responsable de todo el contenido alojado en nuestra infraestructura." },
        { title: "4. Pagos y Reembolsos", text: "Los pagos se procesan de forma segura. Los planes mensuales se pueden cancelar en cualquier momento." },
        { title: "5. Uptime y SLA", text: "DevHosting garantiza un 99,9% de tiempo de actividad mensual." },
        { title: "6. Rescisión", text: "DevHosting se reserva el derecho de suspender cuentas que violen estos términos." },
        { title: "7. Limitación de Responsabilidad", text: "DevHosting no se hace responsable de pérdidas de datos por fallos del cliente o ataques externos." },
        { title: "8. Cambios en los Términos", text: "Estos términos pueden actualizarse en cualquier momento con 30 días de aviso previo." },
        { title: "9. Contacto", text: "Preguntas: contato@devhosting.com.br" },
      ],
    },
    ru: {
      title: "Условия использования",
      updated: "Последнее обновление: 1 января 2025 г.",
      sections: [
        { title: "1. Принятие условий", text: "Используя услуги DevHosting, вы соглашаетесь с настоящими Условиями использования." },
        { title: "2. Предоставляемые услуги", text: "DevHosting предлагает веб-хостинг, VPS, регистрацию доменов и сопутствующие услуги." },
        { title: "3. Обязанности клиента", text: "Клиент несёт ответственность за весь контент, размещённый в нашей инфраструктуре." },
        { title: "4. Оплата и возврат средств", text: "Платежи обрабатываются безопасно. Ежемесячные планы можно отменить в любое время." },
        { title: "5. Время безотказной работы и SLA", text: "DevHosting гарантирует 99,9% ежемесячного времени безотказной работы." },
        { title: "6. Расторжение", text: "DevHosting оставляет за собой право приостановить аккаунты, нарушающие настоящие условия." },
        { title: "7. Ограничение ответственности", text: "DevHosting не несёт ответственности за потерю данных из-за сбоев клиента или внешних атак." },
        { title: "8. Изменения условий", text: "Условия могут быть обновлены в любое время с уведомлением за 30 дней." },
        { title: "9. Контакт", text: "Вопросы: contato@devhosting.com.br" },
      ],
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

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-amber-400" />
          </div>
          <h1 className="text-3xl font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{c.title}</h1>
        </div>
        <p className="text-sm text-white/30 mb-12 font-mono-data">{c.updated}</p>

        <div className="flex flex-col gap-8">
          {c.sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl border border-white/6 p-6"
            >
              <h2 className="text-base font-bold text-amber-400 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>{section.title}</h2>
              <p className="text-sm text-white/60 leading-relaxed">{section.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
