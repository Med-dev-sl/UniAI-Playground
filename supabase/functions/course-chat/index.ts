import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Mistral API configuration
const MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  courseId: string;
  courseName: string;
  courseLevel: string;
  facultyName: string;
  courseDescription: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MISTRAL_API_KEY = Deno.env.get("MISTRAL_API_KEY");
    if (!MISTRAL_API_KEY) {
      throw new Error("MISTRAL_API_KEY is not configured");
    }

    const { messages, courseName, courseLevel, facultyName, courseDescription }: RequestBody = await req.json();

    // Create a specialized system prompt for the course
    const systemPrompt = `You are UniAI, a specialized AI tutor for the "${courseName}" programme at universities in Sierra Leone.

IMPORTANT CONTEXT:
- Programme Level: ${courseLevel}
- Faculty: ${facultyName}
- Course Description: ${courseDescription}

YOUR ROLE:
You are an expert AI assistant specifically trained to help students studying "${courseName}". You have deep knowledge of:
- The course curriculum, concepts, and theories
- Practical applications in Sierra Leone's context
- Local industry standards and practices
- Exam preparation strategies
- Career opportunities in this field

GUIDELINES:
1. Always provide accurate, educational responses relevant to "${courseName}"
2. Use clear explanations suitable for ${courseLevel} level students
3. When explaining complex topics, use analogies and examples relevant to Sierra Leone
4. Encourage critical thinking and provide study tips
5. If asked about topics outside your course expertise, politely redirect to course-relevant topics
6. Be supportive, encouraging, and patient like a good tutor
7. When appropriate, suggest additional resources or study strategies
8. Use markdown formatting for better readability (bold, bullet points, headers)

Remember: You are here to help students succeed in their "${courseName}" studies!`;

    const response = await fetch(MISTRAL_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Mistral rate limit exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("Mistral API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to get AI response from Mistral" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Return the stream directly
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Course chat error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});