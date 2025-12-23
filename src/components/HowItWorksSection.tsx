import { motion } from "framer-motion";
import { Camera, Palette, Wand2, Share, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Scan Your Space",
    description: "Point your camera at any room or upload a photo. Our AI detects walls, furniture, and lighting automatically.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Choose Your Style",
    description: "Browse our curated collection of luxury design styles from Modern Minimalist to Nigerian Heritage.",
  },
  {
    number: "03",
    icon: Wand2,
    title: "Watch the Magic",
    description: "Our AI transforms your room in real-time, replacing furniture, adjusting colors, and adding decor.",
  },
  {
    number: "04",
    icon: Share,
    title: "Save & Share",
    description: "Compare before and after, get price estimates, and share your transformation with family.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden" id="how-it-works">
      <div className="absolute inset-0 bg-chocolate" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-gold/30 mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-beige text-sm font-medium">Simple Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="text-foreground">How It </span>
            <span className="text-gradient-gold">Works</span>
          </h2>
          <p className="text-beige/70 text-lg max-w-xl mx-auto">
            Transform any room in four simple steps
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold">
                    <step.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-espresso border-2 border-gold flex items-center justify-center">
                    <span className="text-xs font-bold text-gold">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
