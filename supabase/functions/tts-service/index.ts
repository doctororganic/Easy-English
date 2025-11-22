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
    const { text, language = 'en', speed = 1.0 } = await req.json();

    if (!text) {
      throw new Error('Text parameter is required');
    }

    // Use browser's Web Speech API as primary method
    // Return instructions for client-side TTS
    const response = {
      success: true,
      method: 'browser_tts',
      instructions: {
        text: text,
        language: language === 'ar' ? 'ar-SA' : 'en-US',
        rate: speed,
        pitch: 1.0,
        volume: 1.0
      },
      audio_url: null,
      message: 'Use browser SpeechSynthesis API for best results'
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('TTS Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        fallback: 'Use browser Web Speech API'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
