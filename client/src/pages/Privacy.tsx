/* DevHosting — Política de Privacidade */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Shield } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function Privacy() {
  const { lang } = useLang();

  const content = {
    pt: {
      title: "Política de Privacidade",
      updated: "Última atualização: 01 de janeiro de 2025",
      sections: [
        { title: "1. Dados Coletados", text: "Coletamos nome, e-mail, endereço IP e dados de pagamento (processados por gateways seguros). Não armazenamos dados de cartão de crédito em nossos servidores." },
        { title: "2. Uso dos Dados", text: "Seus dados são utilizados exclusivamente para: prestação dos serviços contratados, comunicações sobre sua conta, e melhorias em nossos sistemas. Nunca vendemos seus dados a terceiros." },
        { title: "3. Cookies", text: "Utilizamos cookies essenciais para funcionamento do site e cookies analíticos (anonimizados) para melhorar a experiência. Você pode desativar cookies não essenciais nas configurações do navegador." },
        { title: "4. Compartilhamento de Dados", text: "Dados podem ser compartilhados apenas com: processadores de pagamento (Stripe), provedores de infraestrutura (Hetzner, OVH) e autoridades legais quando exigido por lei." },
        { title: "5. Segurança", text: "Todos os dados são transmitidos via HTTPS/TLS. Senhas são armazenadas com hash bcrypt. Realizamos auditorias de segurança periódicas." },
        { title: "6. Seus Direitos (LGPD)", text: "Você tem direito a: acessar seus dados, corrigir informações incorretas, solicitar exclusão da conta e portabilidade dos dados. Envie solicitações para: privacidade@devhosting.com.br" },
        { title: "7. Retenção de Dados", text: "Dados de conta são mantidos enquanto o serviço estiver ativo. Após cancelamento, dados são excluídos em até 90 dias, exceto quando exigido por lei." },
        { title: "8. Contato", text: "Encarregado de Proteção de Dados (DPO): privacidade@devhosting.com.br" },
      ],
    },
    en: {
      title: "Privacy Policy",
      updated: "Last updated: January 1, 2025",
      sections: [
        { title: "1. Data Collected", text: "We collect name, email, IP address and payment data (processed by secure gateways). We do not store credit card data on our servers." },
        { title: "2. Use of Data", text: "Your data is used exclusively for: providing contracted services, account communications, and system improvements. We never sell your data to third parties." },
        { title: "3. Cookies", text: "We use essential cookies for site functionality and anonymized analytics cookies to improve experience. You can disable non-essential cookies in browser settings." },
        { title: "4. Data Sharing", text: "Data may be shared only with: payment processors (Stripe), infrastructure providers (Hetzner, OVH) and legal authorities when required by law." },
        { title: "5. Security", text: "All data is transmitted via HTTPS/TLS. Passwords are stored with bcrypt hash. We perform periodic security audits." },
        { title: "6. Your Rights (GDPR)", text: "You have the right to: access your data, correct incorrect information, request account deletion and data portability. Send requests to: privacy@devhosting.com.br" },
        { title: "7. Data Retention", text: "Account data is maintained while the service is active. After cancellation, data is deleted within 90 days, unless required by law." },
        { title: "8. Contact", text: "Data Protection Officer (DPO): privacy@devhosting.com.br" },
      ],
    },
    es: {
      title: "Política de Privacidad",
      updated: "Última actualización: 1 de enero de 2025",
      sections: [
        { title: "1. Datos Recopilados", text: "Recopilamos nombre, correo electrónico, dirección IP y datos de pago procesados por pasarelas seguras." },
        { title: "2. Uso de Datos", text: "Sus datos se utilizan exclusivamente para prestar los servicios contratados y mejorar nuestros sistemas. Nunca vendemos sus datos." },
        { title: "3. Cookies", text: "Utilizamos cookies esenciales y analíticas anonimizadas para mejorar la experiencia." },
        { title: "4. Compartir Datos", text: "Los datos solo se comparten con procesadores de pago e infraestructura, y autoridades legales cuando lo exige la ley." },
        { title: "5. Seguridad", text: "Todos los datos se transmiten via HTTPS/TLS con auditorías de seguridad periódicas." },
        { title: "6. Sus Derechos (RGPD)", text: "Tiene derecho a acceder, corregir, eliminar y portar sus datos. Contacto: privacidad@devhosting.com.br" },
        { title: "7. Retención de Datos", text: "Los datos se eliminan en 90 días tras la cancelación, salvo obligación legal." },
        { title: "8. Contacto", text: "DPO: privacidad@devhosting.com.br" },
      ],
    },
    ru: {
      title: "Политика конфиденциальности",
      updated: "Последнее обновление: 1 января 2025 г.",
      sections: [
        { title: "1. Собираемые данные", text: "Мы собираем имя, электронную почту, IP-адрес и платёжные данные, обрабатываемые безопасными шлюзами." },
        { title: "2. Использование данных", text: "Ваши данные используются исключительно для предоставления услуг. Мы никогда не продаём ваши данные третьим лицам." },
        { title: "3. Файлы cookie", text: "Мы используем основные и анонимизированные аналитические файлы cookie для улучшения работы." },
        { title: "4. Передача данных", text: "Данные передаются только платёжным системам и провайдерам инфраструктуры, а также по требованию закона." },
        { title: "5. Безопасность", text: "Все данные передаются через HTTPS/TLS. Проводятся периодические аудиты безопасности." },
        { title: "6. Ваши права (GDPR)", text: "Вы имеете право на доступ, исправление, удаление и перенос данных. Контакт: privacy@devhosting.com.br" },
        { title: "7. Хранение данных", text: "Данные удаляются в течение 90 дней после отмены, если иное не требуется по закону." },
        { title: "8. Контакт", text: "DPO: privacy@devhosting.com.br" },
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
          <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-emerald-400" />
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
              <h2 className="text-base font-bold text-emerald-400 mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>{section.title}</h2>
              <p className="text-sm text-white/60 leading-relaxed">{section.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
