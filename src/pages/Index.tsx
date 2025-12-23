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
import { transformRoom, fileToBase64 } from "@/lib/transformRoom";
import { useToast } from "@/hooks/use-toast";

type AppState = "landing" | "upload" | "style" | "processing" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("landing");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetStarted = useCallback(() => {
    setAppState("upload");
    setTimeout(() => {
      document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleImageSelected = useCallback((file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setUploadedFile(file);
    setAppState("style");
    setTimeout(() => {
      document.getElementById("style-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleStyleSelect = useCallback((styleId: string) => {
    setSelectedStyle(styleId);
  }, []);

  const handleTransform = useCallback(async () => {
    if (!selectedStyle || !uploadedFile) return;
    
    setAppState("processing");

    try {
      // Convert file to base64
      const base64 = await fileToBase64(uploadedFile);
      
      // Call the AI transformation
      const result = await transformRoom(base64, selectedStyle);
      
      setTransformedImage(result.transformedImage);
      setAppState("results");
      
      toast({
        title: "Transformation Complete!",
        description: `Your room has been transformed to ${selectedStyle} style.`,
      });
    } catch (error) {
      console.error("Transformation error:", error);
      setAppState("style");
      toast({
        variant: "destructive",
        title: "Transformation Failed",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    }
  }, [selectedStyle, uploadedFile, toast]);

  const handleProcessingComplete = useCallback(() => {
    // This is now handled by the actual API call
  }, []);

  const handleTryAnother = useCallback(() => {
    setSelectedStyle(null);
    setTransformedImage(null);
    setAppState("style");
  }, []);

  const handleReset = useCallback(() => {
    setAppState("landing");
    setUploadedImage(null);
    setUploadedFile(null);
    setSelectedStyle(null);
    setTransformedImage(null);
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
        {appState === "results" && selectedStyle && uploadedImage && (
          <div className="pt-20">
            <ResultsSection
              beforeImage={uploadedImage}
              afterImage={transformedImage || uploadedImage}
              selectedStyle={selectedStyle}
              onTryAnother={handleTryAnother}
              onReset={handleReset}
            />
          </div>
        )}

        {/* Main Flow */}
        {appState !== "results" && appState !== "processing" && (
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
