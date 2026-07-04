import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    const res = await fetch("http://100.49.181.160:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    if (!res.ok) throw new Error("Backend request failed");

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Failed to get response" }, { status: 500 });
  }
}
