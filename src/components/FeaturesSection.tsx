import { motion } from "framer-motion";
import { 
  Smartphone, 
  Palette, 
  Zap, 
  Eye, 
  Sparkles,
  Clock,
  Ruler,
  Share2
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "AR Room Scanning",
    description: "Point your camera at any room and let AI detect walls, furniture, and lighting automatically.",
  },
  {
    icon: Palette,
    title: "6 Luxury Styles",
    description: "From Modern Minimalist to Nigerian Heritage - find the perfect aesthetic for your space.",
  },
  {
    icon: Zap,
    title: "Real-Time Transform",
    description: "Watch your room transform instantly with AI-powered design in seconds, not hours.",
  },
  {
    icon: Ruler,
    title: "Auto Measurements",
    description: "Our AI calculates room dimensions from your photo for accurate furniture placement.",
  },
  {
    icon: Eye,
    title: "Before/After View",
    description: "Compare your original room with the transformation using our interactive slider.",
  },
  {
    icon: Clock,
    title: "Time of Day",
    description: "See how your room looks in morning light, afternoon glow, or evening ambiance.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share your designs with family and friends, or save them for later.",
  },
  {
    icon: Sparkles,
    title: "500+ 3D Models",
    description: "Access our extensive library of premium furniture and decor from top Nigerian brands.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden" id="features">
      <div className="absolute inset-0 bg-gradient-radial" />
      
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
            <span className="text-beige text-sm font-medium">Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="text-foreground">Design Technology</span>
            <br />
            <span className="text-gradient-gold">Meets Luxury</span>
          </h2>
          <p className="text-beige/70 text-lg max-w-xl mx-auto">
            Experience the future of interior design with cutting-edge AI and AR technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 rounded-2xl glass-card border-border/30 hover:border-gold/30 transition-all duration-300 hover:shadow-gold"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
