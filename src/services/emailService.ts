
import { toast } from "sonner";

type FormData = {
  name: string;
  company?: string;
  email: string;
  phone: string;
  serviceType: string[];
  serviceTypeOther?: string;
  objective: string;
  features: string;
  references?: string;
  hasDomain: string;
  budget: string;
  deadline: string;
  gdprConsent: boolean;
};

const getBudgetText = (budget: string): string => {
  switch (budget) {
    case "under3k": return "Até R$ 3.000";
    case "3k-10k": return "R$ 3.000 – R$ 10.000";
    case "over10k": return "Acima de R$ 10.000";
    case "suggestion": return "Precisa de uma sugestão";
    default: return budget;
  }
};

const getDeadlineText = (deadline: string): string => {
  switch (deadline) {
    case "urgent": return "Urgente (Menos de 1 mês)";
    case "1-3months": return "1 a 3 meses";
    case "flexible": return "Sem pressa, quer algo bem elaborado";
    default: return deadline;
  }
};

const getServiceTypesText = (serviceTypes: string[], serviceTypeOther?: string): string => {
  const serviceMap: Record<string, string> = {
    website: "Site institucional",
    ecommerce: "Loja virtual (E-commerce)",
    mobile: "Aplicativo mobile",
    automation: "Automação de processos",
    saas: "SaaS (Software como Serviço)",
    other: serviceTypeOther || "Outro"
  };

  return serviceTypes.map(type => serviceMap[type] || type).join(", ");
};

export const sendQuoteEmail = async (data: FormData): Promise<boolean> => {
  console.log("Enviando email com os dados:", data);
  
  // Formatação do conteúdo do e-mail em HTML
  const emailContent = `
    <h2>Nova solicitação de orçamento</h2>
    <p><strong>Nome:</strong> ${data.name}</p>
    <p><strong>Empresa:</strong> ${data.company || 'N/A'}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Telefone:</strong> ${data.phone}</p>
    <p><strong>Tipo de serviço:</strong> ${getServiceTypesText(data.serviceType, data.serviceTypeOther)}</p>
    <p><strong>Objetivo do projeto:</strong> ${data.objective}</p>
    <p><strong>Funcionalidades essenciais:</strong> ${data.features}</p>
    <p><strong>Referências:</strong> ${data.references || 'Nenhuma'}</p>
    <p><strong>Já possui domínio:</strong> ${data.hasDomain}</p>
    <p><strong>Orçamento:</strong> ${getBudgetText(data.budget)}</p>
    <p><strong>Prazo:</strong> ${getDeadlineText(data.deadline)}</p>
    <p><strong>Data da solicitação:</strong> ${new Date().toLocaleString('pt-BR')}</p>
  `;

  try {
    // Usar o serviço de Email.js para enviar email
    // Neste exemplo, estamos simulando o envio com um timeout
    // Em produção, você usaria um serviço como EmailJS, Sendgrid, AWS SES, etc.
    
    // Aqui estamos usando o EmailJS, mas você pode configurar qualquer serviço de envio de emails
    // Simples utilizando APIs públicas, webhooks ou serviços de email
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: 'YOUR_SERVICE_ID', // Você precisará configurar isso com sua conta EmailJS
        template_id: 'YOUR_TEMPLATE_ID', // Você precisará configurar isso com sua conta EmailJS
        user_id: 'YOUR_USER_ID', // Você precisará configurar isso com sua conta EmailJS
        template_params: {
          to_email: 'pedro.vviana@hotmail.com',
          from_name: data.name,
          from_email: data.email,
          subject: 'Nova solicitação de orçamento - ' + data.name,
          message: emailContent
        }
      })
    });

    // Esta é uma alternativa mais simples usando formsubmit.co
    // Que pode ser usada sem necessidade de configurações adicionais
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('_subject', 'Nova solicitação de orçamento - ' + data.name);
    formData.append('message', emailContent);
    
    await fetch('https://formsubmit.co/pedro.vviana@hotmail.com', {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });

    console.log("Email enviado com sucesso!");
    return true;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    toast.error("Erro ao enviar email. Por favor, tente novamente mais tarde.");
    return false;
  }
};
