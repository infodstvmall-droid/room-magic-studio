import { supabase } from "@/integrations/supabase/client";

export interface TransformRoomResponse {
  transformedImage: string;
  style: string;
  message: string;
}

export interface TransformRoomError {
  error: string;
}

export async function transformRoom(
  imageBase64: string,
  style: string
): Promise<TransformRoomResponse> {
  console.log("Calling transform-room edge function with style:", style);
  
  const { data, error } = await supabase.functions.invoke<TransformRoomResponse>("transform-room", {
    body: { imageBase64, style },
  });

  if (error) {
    console.error("Transform room error:", error);
    throw new Error(error.message || "Failed to transform room");
  }

  if (!data) {
    throw new Error("No data returned from transformation");
  }

  // Check if data contains an error (edge function returned error response)
  if ((data as unknown as TransformRoomError).error) {
    throw new Error((data as unknown as TransformRoomError).error);
  }

  return data;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
