import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute per IP

// Input validation and sanitization
function validateAndSanitizeInput(message: string): { isValid: boolean; sanitized: string; error?: string } {
  if (!message || typeof message !== 'string') {
    return { isValid: false, sanitized: '', error: 'Message is required and must be a string' };
  }
  
  const sanitized = message.trim();
  
  if (sanitized.length === 0) {
    return { isValid: false, sanitized: '', error: 'Message cannot be empty' };
  }
  
  if (sanitized.length > 4000) {
    return { isValid: false, sanitized: '', error: 'Message too long (max 4000 characters)' };
  }
  
  // Basic content filtering - prevent prompt injection attempts
  const suspiciousPatterns = [
    /ignore\s+previous\s+instructions/i,
    /system\s*:/i,
    /assistant\s*:/i,
    /\[system\]/i,
    /\[assistant\]/i,
    /roleplay\s+as/i,
    /pretend\s+to\s+be/i
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitized)) {
      return { isValid: false, sanitized: '', error: 'Message contains prohibited content' };
    }
  }
  
  return { isValid: true, sanitized };
}

function checkRateLimit(clientIP: string): { allowed: boolean; error?: string } {
  const now = Date.now();
  const clientData = rateLimitStore.get(clientIP);
  
  if (!clientData || now > clientData.resetTime) {
    // Reset or create new entry
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }
  
  if (clientData.count >= RATE_LIMIT_MAX) {
    return { allowed: false, error: 'Rate limit exceeded. Please try again later.' };
  }
  
  clientData.count++;
  return { allowed: true };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    // Check rate limit
    const rateLimitCheck = checkRateLimit(clientIP);
    if (!rateLimitCheck.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(JSON.stringify({ error: rateLimitCheck.error }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { message } = await req.json();
    
    // Validate and sanitize input
    const validation = validateAndSanitizeInput(message);
    if (!validation.isValid) {
      console.log(`Invalid input from IP ${clientIP}: ${validation.error}`);
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Get API key securely
    const apiKey = Deno.env.get('API_KEY') || 
                   Deno.env.get('OPENAI_API_KEY') || 
                   Deno.env.get('API Key');

    if (!apiKey) {
      console.error('No API key found');
      return new Response(JSON.stringify({ error: 'Service temporarily unavailable' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing request from IP: ${clientIP}, message length: ${validation.sanitized.length}`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using faster, cheaper model for better rate limiting
        messages: [
          { 
            role: 'system', 
            content: 'You are StartupOS AI Coach, a specialized AI assistant for entrepreneurs. Provide practical, actionable startup advice. Keep responses concise but valuable. You cannot execute commands, browse the web, or perform actions outside of this conversation.' 
          },
          { role: 'user', content: validation.sanitized }
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error(`OpenAI API error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      
      // Don't expose internal API errors to client
      return new Response(JSON.stringify({ error: 'Unable to process your request right now. Please try again.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;
    
    // Log successful interaction for analytics
    console.log(`Successful response generated for IP: ${clientIP}, response length: ${reply.length}`);

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in startup-os-chat function:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});