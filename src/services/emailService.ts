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

// URL do SheetMonkey para envio dos dados
const SHEET_MONKEY_URL = 'https://api.sheetmonkey.io/form/9BT1GKhAAMchuXQCQPuy5p';

export const sendQuoteEmail = async (data: FormData): Promise<boolean> => {
  console.log("Enviando dados do formulário:", data);
  
  try {
    // Preparar os dados para o SheetMonkey
    const formData = new FormData();
    
    // Dados básicos do cliente
    formData.append('Nome', data.name);
    formData.append('Empresa', data.company || 'N/A');
    formData.append('Email', data.email);
    formData.append('Telefone', data.phone);
    
    // Detalhes do serviço
    formData.append('Tipo_de_Servico', getServiceTypesText(data.serviceType, data.serviceTypeOther));
    formData.append('Objetivo', data.objective);
    formData.append('Funcionalidades', data.features);
    formData.append('Referencias', data.references || 'Nenhuma');
    formData.append('Possui_Dominio', data.hasDomain);
    
    // Orçamento e prazo
    formData.append('Orcamento', getBudgetText(data.budget));
    formData.append('Prazo', getDeadlineText(data.deadline));
    
    // Data da solicitação
    formData.append('Data_Solicitacao', new Date().toLocaleString('pt-BR'));
    
    // Assunto do email (para referência)
    formData.append('Assunto', `Orçamento de projeto da ${data.name}`);

    // Enviar dados para o SheetMonkey
    console.log("Enviando dados para SheetMonkey...");
    const response = await fetch(SHEET_MONKEY_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erro no envio: ${response.status} ${response.statusText}`);
    }
    
    console.log("Dados enviados com sucesso!");
    toast.success("Formulário enviado com sucesso! Recebemos sua solicitação de orçamento.");
    return true;
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    
    // Método alternativo: abrir o cliente de email do usuário como fallback
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
      
      const mailtoLink = `mailto:pedro.vviana@hotmail.com?subject=Orçamento de projeto da ${encodeURIComponent(data.name)}&body=${encodeURIComponent(mailtoContent)}`;
      window.open(mailtoLink, '_blank');
      
      toast.warning("Houve um problema no envio automático. Por favor, envie o email que foi aberto manualmente.");
      return true; // Retorna true mesmo com o fallback
    } catch (mailtoError) {
      console.error("Erro no fallback:", mailtoError);
      toast.error("Não foi possível enviar o formulário. Por favor, entre em contato diretamente por pedro.vviana@hotmail.com");
      return false;
    }
  }
};
