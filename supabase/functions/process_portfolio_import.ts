// deno-lint-ignore-file no-explicit-any
// @ts-nocheck
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

interface Payload {
  path: string;
}

serve(async (req) => {
  try {
    const { path } = (await req.json()) as Payload;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Download image from storage
    const { data: imageData, error: downloadErr } = await supabase.storage
      .from("imports")
      .download(path);
    if (downloadErr || !imageData) {
      return new Response(JSON.stringify({ error: downloadErr?.message }), { status: 400 });
    }

    // Convert to base64
    const arrayBuf = await imageData.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuf)));

    // Call OpenAI vision model
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Return JSON array of holdings [{symbol, quantity, avg_price, buy_date}]. No prose.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Here is the screenshot.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/png;base64,${base64}`,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      return new Response(errText, { status: openaiRes.status });
    }

    const { choices } = await openaiRes.json();
    const content = choices?.[0]?.message?.content ?? "[]";
    const parsed: any[] = JSON.parse(content);

    const user = await supabase.auth.getUserById(Deno.env.get("TEST_USER_ID")!);

    // Upsert holdings
    const { error: upsertErr } = await supabase.from("holdings").upsert(
      parsed.map((item) => ({
        user_id: user.data?.user?.id ?? Deno.env.get("TEST_USER_ID"),
        ...item,
      })),
      { onConflict: "user_id,symbol" }
    );

    if (upsertErr) {
      return new Response(JSON.stringify({ error: upsertErr.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ status: "ok", count: parsed.length }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
}); 