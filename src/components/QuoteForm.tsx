
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Send,
  User,
  Building2,
  Mail,
  Phone,
  Clock,
  CreditCard
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormTooltip from "./FormTooltip";
import ProgressBar from "./ProgressBar";
import FormStep from "./FormStep";
import SuccessMessage from "./SuccessMessage";

type FormData = {
  // Step 1
  name: string;
  company: string;
  email: string;
  phone: string;
  
  // Step 2
  serviceType: string[];
  serviceTypeOther?: string;
  
  // Step 3
  objective: string;
  features: string;
  references: string;
  hasDomain: string;
  
  // Step 4
  budget: string;
  deadline: string;
  
  // Step 5
  gdprConsent: boolean;
};

const TOTAL_STEPS = 5;

const QuoteForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  
  const { register, handleSubmit, watch, formState: { errors, isValid }, reset, setValue, getValues } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      serviceType: [],
      hasDomain: "no",
      budget: "3k-10k",
      deadline: "1-3months",
      gdprConsent: false,
    }
  });
  
  const watchCurrentStepFields = () => {
    switch (step) {
      case 1:
        return watch(["name", "email", "phone"]);
      case 2:
        return watch(["serviceType", "serviceTypeOther"]);
      case 3:
        return watch(["objective", "features", "hasDomain"]);
      case 4:
        return watch(["budget", "deadline"]);
      case 5:
        return watch(["gdprConsent"]);
      default:
        return [];
    }
  };
  
  // Call this function to always watch the required fields for the current step
  watchCurrentStepFields();
  
  const checkStepValidity = (): boolean => {
    switch (step) {
      case 1:
        return Boolean(getValues("name") && getValues("email") && getValues("phone"));
      case 2:
        return serviceTypes.length > 0;
      case 3:
        return Boolean(getValues("objective") && getValues("features"));
      case 4:
        return Boolean(getValues("budget") && getValues("deadline"));
      case 5:
        return Boolean(getValues("gdprConsent"));
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const toggleServiceType = (type: string) => {
    if (serviceTypes.includes(type)) {
      setServiceTypes(serviceTypes.filter(t => t !== type));
      setValue("serviceType", serviceTypes.filter(t => t !== type));
    } else {
      setServiceTypes([...serviceTypes, type]);
      setValue("serviceType", [...serviceTypes, type]);
    }
  };
  
  const saveProgress = () => {
    const currentData = getValues();
    localStorage.setItem("quoteFormData", JSON.stringify({
      ...currentData,
      serviceType: serviceTypes,
      lastStep: step
    }));
    
    toast.success("Progresso salvo! Você pode continuar mais tarde.");
  };
  
  const loadProgress = () => {
    const savedData = localStorage.getItem("quoteFormData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      
      // Restore form data
      Object.entries(parsedData).forEach(([key, value]) => {
        if (key !== "lastStep" && key !== "serviceType") {
          // @ts-ignore
          setValue(key, value);
        }
      });
      
      // Restore service types
      if (parsedData.serviceType && Array.isArray(parsedData.serviceType)) {
        setServiceTypes(parsedData.serviceType);
        setValue("serviceType", parsedData.serviceType);
      }
      
      // Restore step
      if (parsedData.lastStep) {
        setStep(parsedData.lastStep);
      }
      
      toast.success("Progresso carregado com sucesso!");
    } else {
      toast.error("Nenhum progresso salvo encontrado.");
    }
  };
  
  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", { ...data, serviceType: serviceTypes });
    // Here you would typically send the data to your backend
    
    // Clear stored progress
    localStorage.removeItem("quoteFormData");
    
    // Show success message
    setSubmitted(true);
    
    // Show success toast
    toast.success("Formulário enviado com sucesso!");
  };
  
  const resetForm = () => {
    reset();
    setServiceTypes([]);
    setStep(1);
    setSubmitted(false);
  };
  
  if (submitted) {
    return <SuccessMessage onReset={resetForm} />;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Step 1: Client Data */}
        <FormStep
          title="Etapa 1 de 5"
          description="Vamos começar! Conta um pouco sobre você."
          isActive={step === 1}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center">
                <User size={16} className="mr-2 text-primary" />
                Nome completo
                <FormTooltip content="Como você gostaria de ser chamado?" />
              </Label>
              <Input
                id="name"
                className="form-input"
                placeholder="Seu nome completo"
                {...register("name", { required: "Nome é obrigatório" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center">
                <Building2 size={16} className="mr-2 text-primary" />
                Nome da empresa
                <FormTooltip content="Se aplicável para o seu projeto" />
              </Label>
              <Input
                id="company"
                className="form-input"
                placeholder="Nome da sua empresa (opcional)"
                {...register("company")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center">
                <Mail size={16} className="mr-2 text-primary" />
                Email
                <FormTooltip content="Para onde podemos enviar sua proposta?" />
              </Label>
              <Input
                id="email"
                type="email"
                className="form-input"
                placeholder="seu@email.com"
                {...register("email", {
                  required: "Email é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center">
                <Phone size={16} className="mr-2 text-primary" />
                Telefone / WhatsApp
                <FormTooltip content="Caso prefira contato direto" />
              </Label>
              <Input
                id="phone"
                className="form-input"
                placeholder="(00) 00000-0000"
                {...register("phone", {
                  required: "Telefone é obrigatório",
                })}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </FormStep>

        {/* Step 2: Service Type */}
        <FormStep
          title="Etapa 2 de 5"
          description="O que você precisa? Escolha uma opção abaixo:"
          isActive={step === 2}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: "website", label: "Site institucional" },
                { id: "ecommerce", label: "Loja virtual (E-commerce)" },
                { id: "mobile", label: "Aplicativo mobile" },
                { id: "automation", label: "Automação de processos" },
                { id: "saas", label: "SaaS (Software como Serviço)" },
                { id: "other", label: "Outro" },
              ].map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                    serviceTypes.includes(service.id)
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 bg-white"
                  }`}
                  onClick={() => toggleServiceType(service.id)}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${service.id}`}
                      checked={serviceTypes.includes(service.id)}
                      onCheckedChange={() => toggleServiceType(service.id)}
                    />
                    <Label
                      htmlFor={`service-${service.id}`}
                      className="cursor-pointer font-medium text-base"
                    >
                      {service.label}
                    </Label>
                  </div>
                </div>
              ))}
            </div>

            {serviceTypes.includes("other") && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="serviceTypeOther">Especifique o serviço</Label>
                <Input
                  id="serviceTypeOther"
                  className="form-input"
                  placeholder="Descreva o serviço que você precisa"
                  {...register("serviceTypeOther", {
                    required: serviceTypes.includes("other")
                      ? "Por favor especifique o serviço"
                      : false,
                  })}
                />
                {errors.serviceTypeOther && (
                  <p className="text-sm text-red-500">
                    {errors.serviceTypeOther.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </FormStep>

        {/* Step 3: Project Details */}
        <FormStep
          title="Etapa 3 de 5"
          description="Conte-nos mais sobre seu projeto. Quanto mais detalhes, melhor!"
          isActive={step === 3}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="objective">
                Objetivo principal
                <FormTooltip content="Ex: Quero um site para captar leads ou um app para melhorar o atendimento ao cliente." />
              </Label>
              <Textarea
                id="objective"
                className="form-input min-h-[100px]"
                placeholder="Descreva o objetivo principal do seu projeto"
                {...register("objective", {
                  required: "O objetivo do projeto é obrigatório",
                })}
              />
              {errors.objective && (
                <p className="text-sm text-red-500">{errors.objective.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">
                Funcionalidades essenciais
                <FormTooltip content="Ex: login de usuários, integração com APIs, sistema de pagamentos, etc." />
              </Label>
              <Textarea
                id="features"
                className="form-input min-h-[100px]"
                placeholder="Liste as principais funcionalidades que seu projeto deve ter"
                {...register("features", {
                  required: "As funcionalidades do projeto são obrigatórias",
                })}
              />
              {errors.features && (
                <p className="text-sm text-red-500">{errors.features.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="references">
                Referências ou Inspirações
                <FormTooltip content="Links de sites/apps que gosta ou quer algo parecido." />
              </Label>
              <Textarea
                id="references"
                className="form-input"
                placeholder="Compartilhe links ou exemplos de projetos que te inspiram (opcional)"
                {...register("references")}
              />
            </div>

            <div className="space-y-2">
              <Label>Já possui domínio/servidor?</Label>
              <RadioGroup
                defaultValue="no"
                onValueChange={(value) => setValue("hasDomain", value)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="domain-yes" />
                  <Label htmlFor="domain-yes" className="cursor-pointer">
                    Sim
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="domain-no" />
                  <Label htmlFor="domain-no" className="cursor-pointer">
                    Não
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="help" id="domain-help" />
                  <Label htmlFor="domain-help" className="cursor-pointer">
                    Preciso de ajuda com isso
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </FormStep>

        {/* Step 4: Budget and Timeline */}
        <FormStep
          title="Etapa 4 de 5"
          description="Defina um orçamento e prazo para que possamos oferecer a melhor solução."
          isActive={step === 4}
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="budget" className="flex items-center">
                <CreditCard size={16} className="mr-2 text-primary" />
                Faixa de orçamento
              </Label>
              <Select 
                onValueChange={(value) => setValue("budget", value)}
                defaultValue="3k-10k"
              >
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Selecione uma faixa de orçamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under3k">Até R$ 3.000</SelectItem>
                  <SelectItem value="3k-10k">R$ 3.000 – R$ 10.000</SelectItem>
                  <SelectItem value="over10k">Acima de R$ 10.000</SelectItem>
                  <SelectItem value="suggestion">Preciso de uma sugestão</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline" className="flex items-center">
                <Clock size={16} className="mr-2 text-primary" />
                Prazo ideal para entrega
              </Label>
              <Select 
                onValueChange={(value) => setValue("deadline", value)}
                defaultValue="1-3months"
              >
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Selecione um prazo ideal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgente (Menos de 1 mês)</SelectItem>
                  <SelectItem value="1-3months">1 a 3 meses</SelectItem>
                  <SelectItem value="flexible">Sem pressa, quero algo bem elaborado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </FormStep>

        {/* Step 5: Confirmation and Final CTA */}
        <FormStep
          title="Etapa 5 de 5"
          description="Quase lá! Finalize sua solicitação."
          isActive={step === 5}
        >
          <div className="space-y-6">
            <div className="p-6 bg-white/60 border border-gray-200 rounded-xl">
              <p className="text-gray-700 leading-relaxed">
                Estamos animados para trazer sua ideia à realidade! Nossa equipe analisará sua solicitação e retornará com a melhor solução para seu projeto.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="gdprConsent"
                checked={watch("gdprConsent")}
                onCheckedChange={(checked) => setValue("gdprConsent", Boolean(checked))}
              />
              <Label
                htmlFor="gdprConsent"
                className="text-sm font-normal leading-relaxed cursor-pointer"
              >
                Autorizo o contato para envio da proposta e concordo com a Política de Privacidade e Termos de Uso.
              </Label>
            </div>
            {errors.gdprConsent && (
              <p className="text-sm text-red-500">{errors.gdprConsent.message}</p>
            )}
          </div>
        </FormStep>

        {/* Navigation buttons */}
        <div className="flex flex-wrap items-center justify-between pt-4">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <Button 
              type="button" 
              variant="outline" 
              onClick={saveProgress}
              className="text-xs sm:text-sm h-10"
            >
              <Save className="w-4 h-4 mr-2" /> Salvar progresso
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={loadProgress}
              className="text-xs sm:text-sm h-10"
            >
              Carregar salvo
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            {step > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                className="h-10"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
              </Button>
            )}
            
            {step < TOTAL_STEPS ? (
              <Button 
                type="button"
                onClick={nextStep}
                disabled={!checkStepValidity()}
                className="h-10"
              >
                Próximo <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={!watch("gdprConsent")}
                className="h-10 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                <Send className="w-4 h-4 mr-2" /> Solicitar Orçamento
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;
