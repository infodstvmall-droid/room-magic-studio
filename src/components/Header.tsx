import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              TVICL
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-beige hover:text-gold transition-colors font-medium">
              Features
            </a>
            <a href="#styles" className="text-beige hover:text-gold transition-colors font-medium">
              Styles
            </a>
            <a href="#how-it-works" className="text-beige hover:text-gold transition-colors font-medium">
              How It Works
            </a>
            <Button variant="luxury" size="default">
              Transform Now
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-beige hover:text-gold transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-border/30"
          >
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-beige hover:text-gold transition-colors font-medium py-2">
                Features
              </a>
              <a href="#styles" className="text-beige hover:text-gold transition-colors font-medium py-2">
                Styles
              </a>
              <a href="#how-it-works" className="text-beige hover:text-gold transition-colors font-medium py-2">
                How It Works
              </a>
              <Button variant="luxury" size="lg" className="w-full mt-2">
                Transform Now
              </Button>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
