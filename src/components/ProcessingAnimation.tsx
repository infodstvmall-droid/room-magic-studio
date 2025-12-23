import { motion } from "framer-motion";
import { Sparkles, Palette, Lightbulb, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ProcessingAnimationProps {
  onComplete?: () => void;
}

const steps = [
  { icon: Sparkles, text: "Analyzing your space...", duration: 3000 },
  { icon: Palette, text: "Applying design style...", duration: 4000 },
  { icon: Lightbulb, text: "Optimizing lighting...", duration: 3000 },
  { icon: Wand2, text: "Finalizing transformation...", duration: 5000 },
];

const ProcessingAnimation = ({ onComplete }: ProcessingAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through steps indefinitely until parent removes this component
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 0.5;
        // Loop progress between 0-95% to show ongoing work
        if (newProgress >= 95) {
          return 10;
        }
        return newProgress;
      });
    }, 100);

    // Cycle through steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, []);

  const CurrentIcon = steps[currentStep]?.icon || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
    >
      <div className="text-center p-8 max-w-md w-full">
        {/* Animated Icon */}
        <motion.div
          key={currentStep}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative mb-8"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gold/20 rounded-full blur-2xl animate-pulse" />
          </div>
          
          {/* Icon Container */}
          <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-gold flex items-center justify-center animate-glow">
            <CurrentIcon className="w-12 h-12 text-primary-foreground" />
          </div>

          {/* Orbiting Particles */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gold rounded-full"
              style={{
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: [0, 60 * Math.cos((i * 2 * Math.PI) / 3), -60 * Math.cos((i * 2 * Math.PI) / 3), 0],
                y: [0, 60 * Math.sin((i * 2 * Math.PI) / 3), -60 * Math.sin((i * 2 * Math.PI) / 3), 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4"
        >
          ✨ Creating Magic...
        </motion.h2>

        {/* Current Step Text */}
        <motion.p
          key={`step-${currentStep}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-beige text-lg mb-8"
        >
          {steps[currentStep]?.text}
        </motion.p>

        {/* Progress Bar */}
        <div className="relative mb-4">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-gold rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-4 mt-8">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={index}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  index === currentStep
                    ? "bg-gold/20 text-gold"
                    : "text-muted-foreground/50"
                }`}
              >
                <StepIcon className="w-4 h-4" />
              </motion.div>
            );
          })}
        </div>

        {/* Estimated Time */}
        <p className="text-muted-foreground text-sm mt-8">
          AI is transforming your room... This may take 15-30 seconds
        </p>
      </div>
    </motion.div>
  );
};

export default ProcessingAnimation;
