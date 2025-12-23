import { motion } from "framer-motion";
import { Camera, Upload, Smartphone, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

interface UploadSectionProps {
  onImageSelected: (file: File) => void;
}

const UploadSection = ({ onImageSelected }: UploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelected(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onImageSelected(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const methods = [
    {
      icon: Camera,
      title: "Take Photo",
      description: "Capture your room live",
      action: () => {
        if (fileInputRef.current) {
          fileInputRef.current.setAttribute("capture", "environment");
          fileInputRef.current.click();
        }
      },
    },
    {
      icon: Upload,
      title: "Upload Photo",
      description: "Choose from gallery",
      action: () => {
        if (fileInputRef.current) {
          fileInputRef.current.removeAttribute("capture");
          fileInputRef.current.click();
        }
      },
    },
    {
      icon: Smartphone,
      title: "AR Scan",
      description: "Live room scanning",
      action: () => {},
      badge: "Coming Soon",
    },
  ];

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      
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
            <span className="text-beige text-sm font-medium">Step 1</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
            <span className="text-foreground">Scan Your </span>
            <span className="text-gradient-gold">Space</span>
          </h2>
          <p className="text-beige/70 text-lg max-w-xl mx-auto">
            Choose how you'd like to capture your room for transformation
          </p>
        </motion.div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Upload Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {methods.map((method, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={method.action}
              disabled={!!method.badge}
              className={`group relative p-8 rounded-2xl glass-card border-border/50 hover:border-gold/50 transition-all duration-300 text-left ${
                method.badge ? "opacity-70 cursor-not-allowed" : "hover:shadow-gold cursor-pointer"
              }`}
            >
              {method.badge && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-medium">
                  {method.badge}
                </div>
              )}
              <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <method.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                {method.title}
              </h3>
              <p className="text-muted-foreground">{method.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Drag & Drop Zone */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.removeAttribute("capture");
                fileInputRef.current.click();
              }
            }}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? "border-gold bg-gold/10"
                : "border-border/50 hover:border-gold/50 hover:bg-card/50"
            }`}
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-beige text-lg mb-2">
              Drag & drop your room photo here
            </p>
            <p className="text-muted-foreground text-sm">
              or click to browse files
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UploadSection;
