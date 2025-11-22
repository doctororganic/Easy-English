Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { text, source = 'en', target = 'ar' } = await req.json();

    if (!text) {
      throw new Error('Text parameter is required');
    }

    // Use MyMemory Translation API (free, no API key required)
    // Limit: 1000 words/day per IP, 10000 words/day with email
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.responseStatus === 200 || data.responseData) {
      return new Response(
        JSON.stringify({
          success: true,
          translation: data.responseData.translatedText,
          source_text: text,
          source_lang: source,
          target_lang: target,
          provider: 'MyMemory'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      throw new Error('Translation failed');
    }

  } catch (error) {
    console.error('Translation Error:', error);
    
    // Fallback: Return original text with error
    return new Response(
      JSON.stringify({
        error: error.message,
        translation: null,
        fallback: true,
        message: 'Translation service unavailable'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
