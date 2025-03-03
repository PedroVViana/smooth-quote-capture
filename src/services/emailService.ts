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
    // Configurar o assunto do email conforme solicitado
    const emailSubject = `Orçamento de projeto da ${data.name}`;
    
    // Usar o formsubmit.co para envio automático de emails
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('_subject', emailSubject);
    
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
    formData.append('_autoresponse', 'Obrigado por solicitar um orçamento! Recebemos sua solicitação e entraremos em contato em breve.'); // Resposta automática para o cliente

    // Envio para formsubmit.co
    console.log("Enviando para formsubmit.co...");
    const response = await fetch('https://formsubmit.co/pedro.vviana@hotmail.com', {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Erro no envio: ${response.status} ${response.statusText}`);
    }
    
    console.log("Email enviado com sucesso!");
    toast.success("Formulário enviado com sucesso! Você receberá uma confirmação por email.");
    return true;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    toast.error("Não foi possível enviar o email. Por favor, tente novamente ou entre em contato diretamente por pedro.vviana@hotmail.com");
    return false;
  }
};
