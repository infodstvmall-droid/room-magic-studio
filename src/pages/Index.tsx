import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import StyleSelector from "@/components/StyleSelector";
import ProcessingAnimation from "@/components/ProcessingAnimation";
import ResultsSection from "@/components/ResultsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";

type AppState = "landing" | "upload" | "style" | "processing" | "results";

// Demo images for transformation preview
const DEMO_BEFORE = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80";
const DEMO_AFTER = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("landing");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const handleGetStarted = useCallback(() => {
    setAppState("upload");
    // Scroll to upload section
    setTimeout(() => {
      document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleImageSelected = useCallback((file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setAppState("style");
    // Scroll to style section
    setTimeout(() => {
      document.getElementById("style-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleStyleSelect = useCallback((styleId: string) => {
    setSelectedStyle(styleId);
  }, []);

  const handleTransform = useCallback(() => {
    if (selectedStyle) {
      setAppState("processing");
    }
  }, [selectedStyle]);

  const handleProcessingComplete = useCallback(() => {
    setAppState("results");
  }, []);

  const handleTryAnother = useCallback(() => {
    setSelectedStyle(null);
    setAppState("style");
  }, []);

  const handleReset = useCallback(() => {
    setAppState("landing");
    setUploadedImage(null);
    setSelectedStyle(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Processing Overlay */}
        <AnimatePresence>
          {appState === "processing" && (
            <ProcessingAnimation onComplete={handleProcessingComplete} />
          )}
        </AnimatePresence>

        {/* Results View */}
        {appState === "results" && selectedStyle && (
          <div className="pt-20">
            <ResultsSection
              beforeImage={uploadedImage || DEMO_BEFORE}
              afterImage={DEMO_AFTER}
              selectedStyle={selectedStyle}
              onTryAnother={handleTryAnother}
              onReset={handleReset}
            />
          </div>
        )}

        {/* Main Flow */}
        {appState !== "results" && (
          <>
            <HeroSection onGetStarted={handleGetStarted} />

            {/* Upload Section - Always visible after getting started */}
            {(appState === "upload" || appState === "style") && (
              <div id="upload-section">
                <UploadSection onImageSelected={handleImageSelected} />
              </div>
            )}

            {/* Style Selector - Visible after image upload */}
            {appState === "style" && (
              <div id="style-section">
                <StyleSelector
                  selectedStyle={selectedStyle}
                  onStyleSelect={handleStyleSelect}
                  onTransform={handleTransform}
                />
              </div>
            )}

            {/* Info Sections - Only on landing */}
            {appState === "landing" && (
              <>
                <FeaturesSection />
                <HowItWorksSection />
              </>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
