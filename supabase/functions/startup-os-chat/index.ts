import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
    // Try different possible secret names
    const apiKey = Deno.env.get('API_KEY') || 
                   Deno.env.get('OPENAI_API_KEY') || 
                   Deno.env.get('API Key');

    console.log('Available environment variables:', Object.keys(Deno.env.toObject()));
    console.log('API Key found:', !!apiKey);

    if (!apiKey) {
      console.error('No API key found. Checked: API_KEY, OPENAI_API_KEY, API Key');
      return new Response(JSON.stringify({ error: 'API key not configured. Please check your Supabase secrets.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Sending request to OpenAI with message:', message);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { 
            role: 'system', 
            content: 'You are the Startup OS Coach, a specialized AI assistant designed to help entrepreneurs and startup founders succeed. You excel at providing strategic business advice, product development guidance, fundraising strategies, marketing insights, team building tips, and operational scaling wisdom. Your responses are practical, actionable, and encouraging. You understand the unique challenges of startups and provide personalized guidance based on the user\'s specific situation. Always be supportive while being realistic about the challenges ahead.' 
          },
          { role: 'user', content: message }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');
    
    const reply = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in startup-os-chat function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});