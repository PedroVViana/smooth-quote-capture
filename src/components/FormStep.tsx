
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FormStepProps {
  title: string;
  description: string;
  children: ReactNode;
  isActive: boolean;
  className?: string;
}

const FormStep = ({
  title,
  description,
  children,
  isActive,
  className,
}: FormStepProps) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className={cn("w-full", className)}
        >
          <div className="mb-6 text-center">
            <div className="inline-block mb-2">
              <span className="chip bg-primary/10 text-primary">
                {title}
              </span>
            </div>
            <h2 className="text-2xl font-display mb-2">{description}</h2>
          </div>
          <div className="animate-fade-in">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormStep;
