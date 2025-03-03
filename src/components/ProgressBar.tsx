
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar = ({ currentStep, totalSteps, className }: ProgressBarProps) => {
  const percentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className={cn("w-full h-1.5 bg-gray-200 rounded-full overflow-hidden", className)}>
      <motion.div 
        className="h-full bg-gradient-to-r from-primary to-secondary"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
        }}
      />
    </div>
  );
};

export default ProgressBar;
