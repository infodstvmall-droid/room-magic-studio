# Room Magic Studio

DEA 12: "Room Transformer" - AR Magic Mirror
Concept: Point phone at any room, watch it transform in real-time
How it works:
Mobile Experience:

Step 1: Scan Your Space
- Point camera at room
- AI detects walls, furniture, lighting
- Measures dimensions automatically
- Identifies existing style

Step 2: Choose Transformation
- "Show me TVICL's Luxury Collection"
- "Make it modern minimalist"
- "Add smart home features"
- "Nigerian heritage style"

Step 3: Real-time AR Overlay
- Furniture replaces current pieces
- Walls change color/texture
- Lighting adjusts
- Decor appears
- Walk around to see all angles

Step 4: Interactive Editing
- Tap furniture to change
- Swipe colors
- Toggle features on/off
- Add/remove elements
- Price updates in real-time

Step 5: Save & Share
- 360° video walkthrough
- Before/after comparison
- Shopping list with prices
- "Book this design" CTA
- Share to social media
Desktop Version:
Upload Room Photo:
- Drag & drop room image
- AI processes and renders
- Same transformation options
- Split-screen before/after
Advanced Features:
"Try On" Mode:
- Upload photo of your own furniture
- See if it fits new design
- Get keep/replace recommendations

"Time of Day" Slider:
- See room in morning light
- Afternoon glow
- Evening ambiance
- Night mood

Material Close-ups:
- Zoom into textures
- See weave patterns
- Touch samples (haptic feedback on mobile)
Tech:

ARKit/ARCore
3D model library (500+ items)
Real-time rendering
AI spatial recognition
Cloud processing

DETAILED DEVELOPMENT PLAN
PHASE 1: AI Room Detection (Weeks 1-3)
What we need to build:
1. Image Upload System
javascript// User uploads room photo
Input: Room image (JPG/PNG)
Processing:
  → Resize/compress
  → Send to AI API
  → Detect room elements
Output: Annotated room data
2. AI Room Analysis
python# Using Segment Anything Model (SAM)

def analyze_room(image):
    # Detect elements
    walls = detect_walls(image)
    floor = detect_floor(image)
    ceiling = detect_ceiling(image)
    furniture = detect_furniture(image)
    windows = detect_windows(image)
    doors = detect_doors(image)
    
    # Get dimensions
    room_dimensions = estimate_dimensions(walls, furniture)
    
    # Identify style
    current_style = classify_style(image)
    
    return {
        'elements': {...},
        'dimensions': {...},
        'style': current_style
    }
3. Room Measurement
javascript// Estimate dimensions from photo
Uses:
- Known object sizes (furniture as reference)
- Perspective calculations
- Floor pattern analysis
- Multiple angle photos (optional)

Output:
- Room width: ~4.2m
- Room length: ~5.8m
- Ceiling height: ~2.8m
- Confidence: 85%
```

**APIs to use:**
- **Roboflow** - Custom object detection
- **Segment Anything** - Precise segmentation
- **OpenCV** - Image processing
- **MediaPipe** - Depth estimation

**Cost:** ~$0.05 per image analysis

---

### **PHASE 2: AR Mobile Experience (Weeks 4-6)**

#### **Mobile AR Implementation:**

**Tech Choice: 8th Wall (Web AR)**

**Why 8th Wall?**
- Works in mobile browsers (no app download!)
- iOS + Android compatible
- Good documentation
- Reasonable pricing ($99-$499/month)

**Alternative: Native Apps**
```
iOS: ARKit + Swift/React Native
Android: ARCore + Kotlin/React Native

Pros: Better performance, more features
Cons: 3-4 months dev time, app store approval
AR Flow:
javascriptStep 1: Camera Access
→ Request permissions
→ Initialize AR session
→ Show camera view

Step 2: Room Scanning
→ User points camera at room
→ Detect planes (walls, floor)
→ Map room boundaries
→ Show scanning feedback

Step 3: Anchor Points
→ Place virtual anchors
→ Lock to real-world positions
→ Track camera movement
→ Maintain AR alignment

Step 4: Content Overlay
→ Load 3D furniture models
→ Position in correct scale
→ Apply materials/textures
→ Add lighting
→ Render in real-time
Code Example (8th Wall):
javascript// Initialize AR scene
AFRAME.registerComponent('room-transformer', {
  init: function() {
    // Wait for camera ready
    this.el.sceneEl.addEventListener('realityready', () => {
      this.startScanning();
    });
  },
  
  startScanning: function() {
    // Detect surfaces
    XR8.XrController.configure({
      enableWorldTracking: true,
      enableSurfaceEstimation: true
    });
    
    // Place furniture
    this.placeFurniture();
  },
  
  placeFurniture: function() {
    // Load TVICL 3D models
    const sofa = new THREE.GLTFLoader();
    sofa.load('models/luxury-sofa.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(1, 1, 1);
      this.el.setObject3D('sofa', model);
    });
  }
});
```

---

### **PHASE 3: Style Transformation (Weeks 5-7)**

#### **AI Image Generation:**

**Approach: Stable Diffusion ControlNet**

**Why ControlNet?**
- Preserves room structure
- Changes only style/furniture
- High quality results
- Controllable outputs

**Workflow:**
```
1. Original room photo
   ↓
2. Create depth map (maintains structure)
   ↓
3. Generate styled version with ControlNet
   ↓
4. Blend with original (preserve walls/windows)
   ↓
5. Enhance details
   ↓
6. Final transformed image
Prompt Engineering:
pythondef generate_style_prompt(style, room_type):
    base = f"Professional interior design photograph, {room_type}"
    
    style_prompts = {
        'modern_minimalist': 
            f"{base}, Scandinavian minimalist, clean lines, "
            "neutral colors, natural light, Lagos luxury apartment, "
            "high-end finishes, 8k, architectural photography",
            
        'african_luxury':
            f"{base}, Afrocentric luxury, Nigerian heritage, "
            "Adire patterns, rich textures, warm earth tones, "
            "contemporary African design, premium materials, "
            "cultural fusion, 8k photography",
            
        'smart_tech':
            f"{base}, Smart home, automated lighting, "
            "modern technology, sleek surfaces, ambient LED, "
            "minimalist tech aesthetic, luxury finishes, 8k",
            
        'classic_elegance':
            f"{base}, Classic Nigerian elegance, traditional meets modern, "
            "rich wood tones, elegant fabrics, sophisticated lighting, "
            "premium finishes, timeless design, 8k"
    }
    
    negative_prompt = "blurry, distorted, unrealistic, low quality, cluttered"
    
    return style_prompts[style], negative_prompt
API Implementation:
javascript// Frontend call
async function transformRoom(imageFile, style) {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('style', style);
  
  const response = await fetch('/api/transform', {
    method: 'POST',
    body: formData
  });
  
  return await response.json();
}

// Backend (Python FastAPI)
from diffusers import StableDiffusionControlNetPipeline, ControlNetModel
import torch

@app.post("/api/transform")
async def transform_room(image: UploadFile, style: str):
    # Load image
    input_image = Image.open(image.file)
    
    # Generate depth map
    depth_map = generate_depth_map(input_image)
    
    # Get style prompt
    prompt, negative = generate_style_prompt(style, "living_room")
    
    # Load ControlNet
    controlnet = ControlNetModel.from_pretrained(
        "lllyasviel/control_v11f1p_sd15_depth"
    )
    
    pipe = StableDiffusionControlNetPipeline.from_pretrained(
        "runwayml/stable-diffusion-v1-5",
        controlnet=controlnet,
        torch_dtype=torch.float16
    )
    
    # Generate
    result = pipe(
        prompt=prompt,
        negative_prompt=negative,
        image=depth_map,
        num_inference_steps=30,
        controlnet_conditioning_scale=0.8
    ).images[0]
    
    # Save and return
    output_url = save_to_s3(result)
    return {"transformed_url": output_url}
```

**Processing Time:** 10-30 seconds per image
**Cost:** ~$0.10-0.30 per transformation

---

### **PHASE 4: User Interface (Weeks 6-8)**

#### **Mobile Interface Design:**
```
┌─────────────────────────────────────┐
│  [TVICL Logo]              [Menu]    │
├─────────────────────────────────────┤
│                                       │
│      Room Transformer                 │
│      Transform Any Space Instantly    │
│                                       │
│  ┌─────────────────────────────┐    │
│  │                               │    │
│  │     [Choose Method]           │    │
│  │                               │    │
│  │  📸 Take Photo                │    │
│  │  📁 Upload Photo              │    │
│  │  🔮 Use AR (Scan Live)       │    │
│  │                               │    │
│  └─────────────────────────────┘    │
│                                       │
│  Popular Transformations:             │
│  [Modern] [Luxury] [Smart] [Classic] │
│                                       │
└─────────────────────────────────────┘
```

**After Upload/Scan:**
```
┌─────────────────────────────────────┐
│  [← Back]  Room Transformer  [Save] │
├─────────────────────────────────────┤
│                                       │
│  ┌─────────────────────────────┐    │
│  │                               │    │
│  │   [Your Room Photo]           │    │
│  │                               │    │
│  └─────────────────────────────┘    │
│                                       │
│  Choose Your Style:                   │
│                                       │
│  ╔════════╗  ┌────────┐  ┌────────┐ │
│  ║ Modern ║  │ Luxury │  │  Smart │ │
│  ╚════════╝  └────────┘  └────────┘ │
│                                       │
│  ┌────────┐  ┌────────┐  ┌────────┐ │
│  │Classic │  │ African│  │Nigerian│ │
│  └────────┘  └────────┘  └────────┘ │
│                                       │
│  [✨ Transform My Room]               │
│                                       │
└─────────────────────────────────────┘
```

**Processing Screen:**
```
┌─────────────────────────────────────┐
│                                       │
│         ✨ Creating Magic...          │
│                                       │
│    ▓▓▓▓▓▓▓▓▓░░░░░░░  65%            │
│                                       │
│    🎨 Analyzing your space...         │
│    🏗️ Applying modern design...      │
│    💡 Optimizing lighting...          │
│                                       │
│    This takes 15-30 seconds           │
│                                       │
└─────────────────────────────────────┘
```

**Results Screen:**
```
┌─────────────────────────────────────┐
│  [← Try Again]  Results  [📤 Share] │
├─────────────────────────────────────┤
│                                       │
│  ┌─────────────────────────────┐    │
│  │                               │    │
│  │  ← Drag to Compare →         │    │
│  │  [Before | After Slider]     │    │
│  │                               │    │
│  └─────────────────────────────┘    │
│                                       │
│  ✨ Modern Minimalist Transformation │
│                                       │
│  What Changed:                        │
│  ✓ Scandinavian sofa (₦450,000)     │
│  ✓ Marble coffee table (₦180,000)   │
│  ✓ Ambient LED lighting (₦95,000)   │
│  ✓ Neutral wall paint (₦35,000)     │
│                                       │
│  Total Estimate: ₦760,000            │
│                                       │
│  [🎨 Try Another Style]               │
│  [📞 Book Free Consultation]          │
│  [💾 Save to My Designs]              │
│  [📤 Share with Family]               │
│                                       │
└─────────────────────────────────────┘
```

---

### **PHASE 5: 3D Furniture Library (Weeks 7-9)**

#### **Building the Asset Library:**

**3D Model Sources:**

**Option 1: Purchase Pre-made Models**
```
Sources:
- TurboSquid ($20-200 per model)
- Sketchfab ($10-100 per model)
- CGTrader ($15-150 per model)

Quality needed: Mid-poly (10k-50k polygons)
Format: GLTF/GLB (web optimized)
Textures: 2K resolution

Initial library: 50-100 models
Categories:
- Sofas & seating (15)
- Tables (10)
- Storage (10)
- Lighting (10)
- Decor (15)
- Smart devices (10)
- Nigerian furniture (10)
- Beds (10)

Budget: $2K-5K for library
```

**Option 2: Commission Custom Models**
```
Hire 3D artist on:
- Fiverr ($50-200 per model)
- Upwork ($30-150 per model)
- Nigerian 3D artists (support local!)

TVICL-specific models:
- Photograph your actual furniture
- Create exact 3D replicas
- Add to catalog

Budget: $3K-8K for custom library
Timeline: 4-6 weeks
```

**Option 3: Scan Real Furniture**
```
Use photogrammetry:
- iPhone LiDAR scanner
- Polycam app (free-$10/month)
- 3DF Zephyr software

Process:
1. Take 50-100 photos around furniture
2. Process in software
3. Clean up mesh
4. Optimize for web
5. Add textures

Pro: Authentic TVICL pieces
Con: Time-intensive
Model Optimization:
javascript// Compress for web performance
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// Use Draco compression
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

// Typical sizes:
// Uncompressed: 5-15 MB
// Draco compressed: 500KB-2MB (10x smaller!)

PHASE 6: Interactive Features (Weeks 8-10)
Before/After Slider:
javascript// React component
import { useState } from 'react';
import { motion } from 'framer-motion';

function BeforeAfterSlider({ beforeImage, afterImage }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* After Image (Full) */}
      <img 
        src={afterImage} 
        className="absolute w-full h-full object-cover"
      />
      
      {/* Before Image (Clipped) */}
      <motion.div 
        className="absolute w-full h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Slider Handle */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: window.innerWidth }}
        onDrag={(e, info) => {
          const newPos = (info.point.x / window.innerWidth) * 100;
          setSliderPosition(newPos);
        }}
        className="absolute top-0 h-full w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 
                        w-12 h-12 bg-white rounded-full shadow-lg
                        flex items-center justify-center">
          ⟷
        </div>
      </motion.div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded">
        After
      </div>
    </div>
  );
}
Price Calculator:
javascript// Calculate transformation cost
function calculatePrice(detectedChanges) {
  const priceDatabase = {
    furniture: {
      'sofa': { min: 200000, max: 800000 },
      'coffee_table': { min: 80000, max: 350000 },
      'dining_table': { min: 150000, max: 600000 },
      'chair': { min: 30000, max: 150000 }
    },
    finishes: {
      'paint': { perSqm: 2500 },
      'flooring_tiles': { perSqm: 8000 },
      'wallpaper': { perSqm: 5000 }
    },
    lighting: {
      'ambient_led': { min: 50000, max: 200000 },
      'chandelier': { min: 100000, max: 500000 },
      'smart_lights': { min: 80000, max: 300000 }
    }
  };
  
  let total = 0;
  let items = [];
  
  detectedChanges.forEach(change => {
    const price = priceDatabase[change.category][change.item];
    const itemCost = price.min + (price.max - price.min) * 0.6; // Mid-range
    
    total += itemCost;
    items.push({
      name: change.item,
      cost: itemCost,
      confidence: change.confidence
    });
  });
  
  // Add labor (30% of materials)
  const labor = total * 0.3;
  total += labor;
  
  return {
    subtotal: total - labor,
    labor: labor,
    total: total,
    items: items,
    disclaimer: "Estimate based on mid-range options. Final price depends on specific selections."
  };
}

PHASE 7: Sharing & Social (Weeks 9-10)
Social Sharing Features:
javascript// Share functionality
async function shareTransformation(beforeImage, afterImage, style) {
  // Create share card
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Design share card
  canvas.width = 1200;
  canvas.height = 630; // Twitter/FB optimal
  
  // Split screen before/after
  drawImage(ctx, beforeImage, 0, 0, 600, 630);
  drawImage(ctx, afterImage, 600, 0, 600, 630);
  
  // Add TVICL branding
  ctx.fillStyle = '#FFB700';
  ctx.font = 'bold 48px Inter';
  ctx.fillText('Transformed by TVICL', 50, 580);
  
  // Convert to blob
  const blob = await canvasToBlob(canvas);
  
  // Native share API
  if (navigator.share) {
    await navigator.share({
      title: `My ${style} Room Transformation`,
      text: 'Check out my room transformation by TVICL!',
      files: [new File([blob], 'transformation.png', { type: 'image/png' })]
    });
  } else {
    // Fallback: Download
    downloadFile(blob, 'tvicl-transformation.png');
  }
}

// Social media meta tags
<Head>
  <meta property="og:title" content="Room Transformation by TVICL" />
  <meta property="og:description" content="See my AI-powered interior design transformation" />
  <meta property="og:image" content={transformationImage} />
  <meta name="twitter:card" content="summary_large_image" />
</Head>
```

---
Perfect. Below is an **exact, ready-to-use brown luxury color palette** tailored for your website, replacing all blue UI elements.

You can hand this **directly to designers and developers**.

---

## 🎨 TVICL – Brown Luxury UI Color Palette (HEX)

### **Primary Background Colors**

Use these for main sections, hero areas, and full-page backgrounds.

* **Deep Espresso (Primary Background)**
  `#1C120D`

* **Dark Chocolate (Secondary Background)**
  `#241813`

* **Warm Charcoal (Section Background)**
  `#2E2019`

---

### **Surface / Card Colors**

For cards, modals, feature blocks, and overlays.

* **Rich Brown Surface**
  `#3A2A22`

* **Soft Cocoa Surface**
  `#4A362C`

---

### **Primary Brand Accent (Gold / CTA)**

Use for **main buttons, highlights, key CTAs**.

* **Luxury Gold (Primary CTA)**
  `#D4A44A`

* **Deep Amber (Hover State)**
  `#B88A3B`

---

### **Secondary Accent Colors**

For outlines, secondary buttons, icons, and subtle emphasis.

* **Bronze Accent**
  `#9C6B2F`

* **Muted Beige Accent**
  `#CBB89D`

---

### **Text Colors**

Ensure readability while keeping a warm tone.

* **Primary Text (Headings)**
  `#FFFFFF`

* **Secondary Text (Body Copy)**
  `#E6DCCF`

* **Muted Text / Labels**
  `#B8A99A`

---

### **Borders / Dividers**

Subtle, warm separators.

* **Soft Brown Border**
  `#5A4438`

* **Gold Divider (Optional)**
  `#8C6A32`

---

### **Button Examples**

* **Primary Button:**
  Background `#D4A44A`
  Text `#1C120D`

* **Primary Hover:**
  Background `#B88A3B`

* **Secondary Button:**
  Background `transparent`
  Border `#D4A44A`
  Text `#D4A44A`

---

### **STRICT RULE**

❌ No blues
❌ No blue-tinted greys
❌ No cyan or tech colors

Every color must sit within **brown, gold, beige, or warm neutral tones**.

---

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fa73ee5e-cd76-4f24-8e13-f514e5483dba).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
