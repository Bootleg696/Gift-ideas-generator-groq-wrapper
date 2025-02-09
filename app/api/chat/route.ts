import { NextResponse } from "next/server"; 

export const runtime = "edge";  

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log("API Route hit:", messages);

    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not set");
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`, 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",  // Use a chat model instead of whisper
        messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Groq API error:", error);
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to generate response" }),
      { status: 500 }
    );
  }
}
