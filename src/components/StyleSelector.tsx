import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { Button } from "./ui/button";

interface Style {
  id: string;
  name: string;
  description: string;
  icon: string;
  colors: string[];
}

interface StyleSelectorProps {
  selectedStyle: string | null;
  onStyleSelect: (styleId: string) => void;
  onTransform: () => void;
}

const styles: Style[] = [
  {
    id: "modern",
    name: "Modern Minimalist",
    description: "Clean lines, neutral tones, Scandinavian influence",
    icon: "🏛️",
    colors: ["#E5E0DB", "#2C2C2C", "#D4A44A"],
  },
  {
    id: "luxury",
    name: "TVICL Luxury",
    description: "Premium finishes, elegant materials, sophisticated",
    icon: "✨",
    colors: ["#1C120D", "#D4A44A", "#CBB89D"],
  },
  {
    id: "smart",
    name: "Smart Tech",
    description: "Automated lighting, modern technology, sleek surfaces",
    icon: "💡",
    colors: ["#1A1A2E", "#00D4AA", "#4A362C"],
  },
  {
    id: "classic",
    name: "Classic Elegance",
    description: "Timeless design, rich wood, elegant fabrics",
    icon: "🏆",
    colors: ["#3A2A22", "#8B4513", "#CBB89D"],
  },
  {
    id: "african",
    name: "African Heritage",
    description: "Afrocentric patterns, warm earth tones, cultural fusion",
    icon: "🌍",
    colors: ["#8B4513", "#D4A44A", "#2E1810"],
  },
  {
    id: "nigerian",
    name: "Nigerian Contemporary",
    description: "Modern Nigerian design, local craftsmanship, bold patterns",
    icon: "🇳🇬",
    colors: ["#006400", "#D4A44A", "#3A2A22"],
  },
];

const StyleSelector = ({ selectedStyle, onStyleSelect, onTransform }: StyleSelectorProps) => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden" id="styles">
      <div className="absolute inset-0 bg-chocolate" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-gold/30 mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-beige text-sm font-medium">Step 2</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="text-foreground">Choose Your </span>
            <span className="text-gradient-gold">Style</span>
          </h2>
          <p className="text-beige/70 text-lg max-w-xl mx-auto">
            Select from our curated collection of luxury interior design styles
          </p>
        </motion.div>

        {/* Style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {styles.map((style, index) => (
            <motion.button
              key={style.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => onStyleSelect(style.id)}
              className={`group relative p-6 rounded-2xl text-left transition-all duration-300 ${
                selectedStyle === style.id
                  ? "bg-gradient-gold shadow-gold scale-[1.02]"
                  : "glass-card border-border/50 hover:border-gold/50 hover:shadow-gold"
              }`}
            >
              {/* Selected Indicator */}
              {selectedStyle === style.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 rounded-full bg-espresso flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-gold" />
                </motion.div>
              )}

              {/* Style Icon */}
              <div className="text-4xl mb-4">{style.icon}</div>

              {/* Style Info */}
              <h3
                className={`text-xl font-serif font-semibold mb-2 ${
                  selectedStyle === style.id ? "text-primary-foreground" : "text-foreground"
                }`}
              >
                {style.name}
              </h3>
              <p
                className={`text-sm mb-4 ${
                  selectedStyle === style.id ? "text-primary-foreground/80" : "text-muted-foreground"
                }`}
              >
                {style.description}
              </p>

              {/* Color Palette */}
              <div className="flex gap-2">
                {style.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border border-border/30"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Transform Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            variant="luxury"
            size="xl"
            onClick={onTransform}
            disabled={!selectedStyle}
            className="min-w-64"
          >
            <Sparkles className="w-5 h-5" />
            Transform My Room
          </Button>
          {!selectedStyle && (
            <p className="text-muted-foreground text-sm mt-4">
              Select a style to continue
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default StyleSelector;
