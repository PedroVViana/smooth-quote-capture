import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessMessageProps {
  onReset: () => void;
}

const SuccessMessage = ({ onReset }: SuccessMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1,
      }}
      className="text-center py-10"
    >
      <div className="mb-8 flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5,
          }}
          className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-green-600" />
        </motion.div>
      </div>
      
      <h2 className="text-3xl font-display font-semibold mb-4">
        Solicitação Enviada com Sucesso!
      </h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-gray-600 mb-8 max-w-md mx-auto"
      >
        Sua solicitação de orçamento foi registrada com sucesso! 
        Estamos animados para trazer sua ideia à realidade e retornaremos 
        com a melhor solução para seu projeto em até 24 horas.
      </motion.p>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="text-gray-500 mb-8 max-w-md mx-auto text-sm"
      >
        Nossa equipe analisará os detalhes e entrará em contato em breve.
      </motion.p>
      
      <Button
        onClick={onReset}
        className="group"
      >
        Solicitar Novo Orçamento
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};

export default SuccessMessage;
