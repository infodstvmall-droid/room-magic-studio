import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { 
  Camera, 
  X, 
  FlipHorizontal, 
  Aperture,
  Scan,
  Focus,
  Loader2
} from "lucide-react";

interface ARScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

const ARScanner = ({ isOpen, onClose, onCapture }: ARScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [isCapturing, setIsCapturing] = useState(false);
  const [scanLines, setScanLines] = useState(true);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Stop existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsLoading(false);
    } catch (err) {
      console.error("Camera error:", err);
      setError("Unable to access camera. Please grant camera permissions.");
      setIsLoading(false);
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isOpen, startCamera, stopCamera]);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    }
  }, [facingMode, isOpen, startCamera]);

  const handleCapture = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    setScanLines(false);

    // Flash effect
    await new Promise(resolve => setTimeout(resolve, 150));

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], "ar-scan.jpg", { type: "image/jpeg" });
          onCapture(file);
          stopCamera();
          onClose();
        }
        setIsCapturing(false);
        setScanLines(true);
      },
      "image/jpeg",
      0.92
    );
  }, [onCapture, onClose, stopCamera]);

  const toggleCamera = useCallback(() => {
    setFacingMode(prev => prev === "environment" ? "user" : "environment");
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background"
      >
        {/* Camera View */}
        <div className="relative w-full h-full overflow-hidden">
          {/* Video Element */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Hidden Canvas for Capture */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto mb-4" />
                <p className="text-beige">Initializing camera...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-background p-8">
              <div className="text-center max-w-md">
                <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                  Camera Access Required
                </h3>
                <p className="text-muted-foreground mb-6">{error}</p>
                <div className="flex gap-4 justify-center">
                  <Button variant="luxury" onClick={startCamera}>
                    Try Again
                  </Button>
                  <Button variant="luxury-outline" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* AR Overlay */}
          {!isLoading && !error && (
            <>
              {/* Scan Lines Effect */}
              {scanLines && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Animated Scan Line */}
                  <motion.div
                    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Corner Brackets */}
                  <div className="absolute inset-8 sm:inset-16 pointer-events-none">
                    {/* Top Left */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-gold/70" />
                    {/* Top Right */}
                    <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-gold/70" />
                    {/* Bottom Left */}
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-gold/70" />
                    {/* Bottom Right */}
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-gold/70" />
                  </div>

                  {/* Grid Overlay */}
                  <div className="absolute inset-8 sm:inset-16 grid grid-cols-3 grid-rows-3 pointer-events-none">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="border border-gold/10" />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Capture Flash Effect */}
              <AnimatePresence>
                {isCapturing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-foreground pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Top Bar */}
              <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-b from-background/80 to-transparent">
                <Button
                  variant="glass"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card">
                  <Scan className="w-4 h-4 text-gold" />
                  <span className="text-sm font-medium text-beige">AR Scan Mode</span>
                </div>

                <Button
                  variant="glass"
                  size="icon"
                  onClick={toggleCamera}
                  className="rounded-full"
                >
                  <FlipHorizontal className="w-5 h-5" />
                </Button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 bg-gradient-to-t from-background/90 to-transparent">
                {/* Instructions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-6"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Focus className="w-5 h-5 text-gold" />
                    <span className="text-foreground font-medium">Point at your room</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Center the room in frame, then tap capture
                  </p>
                </motion.div>

                {/* Capture Button */}
                <div className="flex items-center justify-center gap-8">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCapture}
                    disabled={isCapturing}
                    className="relative w-20 h-20 rounded-full focus:outline-none focus:ring-4 focus:ring-gold/50"
                  >
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-foreground" />
                    
                    {/* Inner Button */}
                    <motion.div
                      className="absolute inset-2 rounded-full bg-gradient-gold flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      {isCapturing ? (
                        <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
                      ) : (
                        <Aperture className="w-8 h-8 text-primary-foreground" />
                      )}
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ARScanner;
