
import { motion } from "framer-motion";
import QuoteForm from "@/components/QuoteForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container px-4 py-8 md:py-12 lg:py-20"
      >
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-3"
          >
            <span className="chip bg-secondary/10 text-secondary text-xs sm:text-sm">
              SOLICITE ORÇAMENTO
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          >
            Transforme suas ideias em realidade
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-3 sm:px-0"
          >
            Preencha o formulário abaixo para receber uma proposta personalizada 
            para o seu projeto. Nossa equipe especializada está pronta para ajudar!
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white/40 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 mx-auto max-w-[95%] md:max-w-[90%]"
        >
          <QuoteForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
