import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const stylePrompts: Record<string, string> = {
  modern: "Transform into a modern minimalist interior design, Scandinavian style with clean lines, neutral colors, natural light, high-end finishes, architectural photography, 8k quality",
  luxury: "Transform into a luxury high-end interior design, premium materials, elegant gold accents, sophisticated ambient lighting, rich textures, professional interior photography, 8k quality",
  smart: "Transform into a smart home modern interior, automated LED ambient lighting, sleek surfaces, minimalist tech aesthetic, modern technology integration, professional photography, 8k quality",
  classic: "Transform into classic elegant interior design, timeless furniture, rich wood tones, elegant fabrics, sophisticated lighting, premium finishes, professional interior photography, 8k quality",
  african: "Transform into Afrocentric luxury interior design, African heritage patterns, warm earth tones, cultural art pieces, rich textures, contemporary African fusion design, professional photography, 8k quality",
  nigerian: "Transform into contemporary Nigerian interior design, modern African aesthetic, local craftsmanship, bold geometric patterns, warm colors, cultural elements with modern twist, 8k quality",
};

serve(async (req) => {
  console.log("Transform room function called");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, style } = await req.json();
    
    if (!imageBase64) {
      console.error("No image provided");
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!style || !stylePrompts[style]) {
      console.error("Invalid style:", style);
      return new Response(
        JSON.stringify({ error: "Invalid style. Available styles: modern, luxury, smart, classic, african, nigerian" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Transforming room with style:", style);
    const prompt = `${stylePrompts[style]}. This is a room interior photo that needs to be redesigned. Keep the room structure and perspective but transform all furniture, decor, wall colors, and lighting to match the described style. The result should look like a professional interior design photograph.`;

    // Use Lovable AI image generation with image editing capability
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64.startsWith("data:") ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add more credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to transform room. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    console.log("AI response received, checking for image...");

    // Extract the generated image from the response
    const generatedImage = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!generatedImage) {
      console.error("No image in AI response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "No transformed image generated. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Room transformation successful");
    
    return new Response(
      JSON.stringify({ 
        transformedImage: generatedImage,
        style: style,
        message: "Room transformation complete!"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in transform-room function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
