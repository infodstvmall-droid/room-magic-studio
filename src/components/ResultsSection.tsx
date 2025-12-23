import { motion } from "framer-motion";
import { Button } from "./ui/button";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { 
  Sparkles, 
  Palette, 
  Phone, 
  Download, 
  Share2, 
  ArrowLeft,
  Check,
  Sofa,
  Lamp,
  PaintBucket,
  Frame
} from "lucide-react";

interface ResultsSectionProps {
  beforeImage: string;
  afterImage: string;
  selectedStyle: string;
  onTryAnother: () => void;
  onReset: () => void;
}

const styleNames: Record<string, string> = {
  modern: "Modern Minimalist",
  luxury: "TVICL Luxury",
  smart: "Smart Tech",
  classic: "Classic Elegance",
  african: "African Heritage",
  nigerian: "Nigerian Contemporary",
};

const mockItems = [
  { icon: Sofa, name: "Scandinavian Sofa", price: 450000 },
  { icon: Frame, name: "Marble Coffee Table", price: 180000 },
  { icon: Lamp, name: "Ambient LED Lighting", price: 95000 },
  { icon: PaintBucket, name: "Neutral Wall Paint", price: 35000 },
];

const ResultsSection = ({
  beforeImage,
  afterImage,
  selectedStyle,
  onTryAnother,
  onReset,
}: ResultsSectionProps) => {
  const total = mockItems.reduce((acc, item) => acc + item.price, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={onReset} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Start Over
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-gold/30 mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-beige text-sm font-medium">Transformation Complete</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="text-foreground">Your </span>
            <span className="text-gradient-gold">{styleNames[selectedStyle]}</span>
            <span className="text-foreground"> Room</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Before/After Slider */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <BeforeAfterSlider beforeImage={beforeImage} afterImage={afterImage} />
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Items Changed */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-serif font-semibold text-foreground mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-gold" />
                What Changed
              </h3>
              <div className="space-y-4">
                {mockItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between py-3 border-b border-border/30 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium">{item.name}</p>
                        <p className="text-muted-foreground text-sm">
                          <Check className="w-3 h-3 inline mr-1 text-green-500" />
                          Included
                        </p>
                      </div>
                    </div>
                    <span className="text-gold font-semibold">{formatPrice(item.price)}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Total */}
              <div className="mt-6 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-serif font-semibold text-foreground">
                    Estimated Total
                  </span>
                  <span className="text-2xl font-serif font-bold text-gold">
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs mt-2">
                  *Estimate based on mid-range options. Final price depends on specific selections.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="luxury" size="lg" className="w-full">
                <Phone className="w-5 h-5" />
                Book Consultation
              </Button>
              <Button variant="luxury-outline" size="lg" className="w-full" onClick={onTryAnother}>
                <Palette className="w-5 h-5" />
                Try Another Style
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="glass" size="lg" className="w-full">
                <Download className="w-5 h-5" />
                Save Design
              </Button>
              <Button variant="glass" size="lg" className="w-full">
                <Share2 className="w-5 h-5" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
