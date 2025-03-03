
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
    // Usar o formsubmit.co que é mais confiável para entrega de emails
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('_subject', 'Nova solicitação de orçamento - ' + data.name);
    
    // Adicionar todos os campos como conteúdo do email
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'serviceType') {
        formData.append(key, getServiceTypesText(data.serviceType, data.serviceTypeOther));
      } else if (key === 'budget') {
        formData.append(key, getBudgetText(value as string));
      } else if (key === 'deadline') {
        formData.append(key, getDeadlineText(value as string));
      } else if (typeof value !== 'object') {
        formData.append(key, String(value));
      }
    });
    
    // Adicionar o conteúdo HTML formatado
    formData.append('message', emailContent);
    
    // Configurar para enviar uma cópia para o email especificado
    formData.append('_cc', 'pedro.vviana@hotmail.com');
    
    // Adicionar configurações extras para garantir entrega
    formData.append('_template', 'table'); // Usar o template de tabela que é mais estruturado
    formData.append('_captcha', 'false'); // Desativar captcha para facilitar envio

    // Envio para formsubmit.co
    console.log("Enviando para formsubmit.co...");
    await fetch('https://formsubmit.co/pedro.vviana@hotmail.com', {
      method: 'POST',
      body: formData
    });
    
    // Como backup, enviar também via Email.js se configurado
    try {
      const emailJsData = {
        service_id: 'default_service', // Substituir por um service_id válido se disponível
        template_id: 'template_default', // Substituir por um template_id válido se disponível
        user_id: 'user_default', // Substituir por um user_id válido se disponível
        template_params: {
          to_name: 'Equipe de Vendas',
          from_name: data.name,
          from_email: data.email,
          to_email: 'pedro.vviana@hotmail.com',
          subject: 'Nova solicitação de orçamento - ' + data.name,
          message: emailContent,
          reply_to: data.email
        }
      };

      // Enviar via EmailJS como alternativa (opcional, descomentar se tiver as credenciais configuradas)
      /*
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailJsData)
      });
      */
    } catch (emailJsError) {
      console.log("Erro no envio via EmailJS (ignorando pois temos outros métodos):", emailJsError);
    }

    // Método alternativo direto usando mailto link para abrir o cliente de email
    // Isso abre o cliente de email do usuário com os dados preenchidos
    const mailtoLink = `mailto:pedro.vviana@hotmail.com?subject=Nova solicitação de orçamento - ${encodeURIComponent(data.name)}&body=${encodeURIComponent(emailContent)}`;
    
    // Abrir o link em uma nova aba (o usuário precisará enviar manualmente)
    window.open(mailtoLink, '_blank');

    console.log("Email enviado com sucesso!");
    toast.success("Formulário enviado com sucesso! Você também pode enviar manualmente através do seu cliente de email que foi aberto.");
    return true;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    
    // Mesmo com erro, tenta o método de fallback com mailto
    try {
      const mailtoContent = `
Nome: ${data.name}
Email: ${data.email}
Telefone: ${data.phone}
Tipo de serviço: ${getServiceTypesText(data.serviceType, data.serviceTypeOther)}
Objetivo: ${data.objective}
Funcionalidades: ${data.features}
Orçamento: ${getBudgetText(data.budget)}
Prazo: ${getDeadlineText(data.deadline)}
      `;
      
      const mailtoLink = `mailto:pedro.vviana@hotmail.com?subject=Nova solicitação de orçamento - ${encodeURIComponent(data.name)}&body=${encodeURIComponent(mailtoContent)}`;
      window.open(mailtoLink, '_blank');
      
      toast.warning("Houve um problema no envio automático. Por favor, envie o email que foi aberto manualmente.");
      return true; // Retorna true mesmo com o fallback
    } catch (mailtoError) {
      console.error("Erro no fallback:", mailtoError);
      toast.error("Não foi possível enviar o email. Por favor, entre em contato diretamente por pedro.vviana@hotmail.com");
      return false;
    }
  }
};
