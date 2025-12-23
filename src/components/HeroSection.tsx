import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-bronze/10 rounded-full blur-3xl" />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/3 left-1/6 w-4 h-4 bg-gold/40 rounded-full"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/5 w-3 h-3 bg-bronze/50 rounded-full"
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-gold/30 rounded-full"
        animate={{ y: [-5, 15, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-gold/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-beige text-sm font-medium">AI-Powered Interior Design</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6"
          >
            <span className="text-foreground">Transform Any Space</span>
            <br />
            <span className="text-gradient-gold">Instantly</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-beige/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Point your camera at any room and watch it transform in real-time. 
            Experience luxury Nigerian interior design with the power of AI and AR.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              variant="luxury" 
              size="xl" 
              className="w-full sm:w-auto group"
              onClick={onGetStarted}
            >
              <Wand2 className="w-5 h-5" />
              Start Transforming
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="luxury-outline" size="xl" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-16"
          >
            {[
              { value: "500+", label: "3D Furniture Models" },
              { value: "10K+", label: "Rooms Transformed" },
              { value: "6", label: "Design Styles" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero Image Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 sm:mt-20 max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-card border border-border/50">
            <div className="aspect-video bg-chocolate flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-gold flex items-center justify-center mb-4 animate-glow">
                  <Wand2 className="w-10 h-10 text-primary-foreground" />
                </div>
                <p className="text-beige text-lg">Room transformation preview</p>
                <p className="text-muted-foreground text-sm mt-2">Upload a photo to see the magic</p>
              </div>
            </div>
            
            {/* Overlay Elements */}
            <div className="absolute bottom-4 left-4 glass-card rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-beige">AI Ready</span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 glass-card rounded-lg px-4 py-2">
              <span className="text-sm text-gold font-medium">✨ Modern Minimalist</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
