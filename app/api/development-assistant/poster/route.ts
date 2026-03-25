import OpenAI from 'openai';

function getOpenAIClient() {
  return new OpenAI({
    timeout: 120000,
    maxRetries: 2,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { logline, plotSummary, format, platform } = body;

    if (!logline) {
      return Response.json(
        { error: 'Logline is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openai = getOpenAIClient();

    // Create a prompt for a movie poster
    const posterPrompt = `Create a cinematic movie poster for:

"${logline}"

Style requirements:
- Professional Hollywood movie poster composition
- Dramatic lighting and mood appropriate to the genre
- ${format === 'series' ? 'TV series poster style with ensemble feel' : 'Feature film theatrical poster style'}
- No text, titles, or words on the poster - just the visual imagery
- Photorealistic cinematic quality
- Strong central composition with depth
- Color palette that evokes the tone of the story
- Could hang in a movie theater lobby

Additional context: ${plotSummary ? plotSummary.slice(0, 500) : 'A compelling story for ' + platform}`;

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: posterPrompt,
      n: 1,
      size: '1024x1792', // Portrait orientation for movie poster
      quality: 'hd',
      style: 'vivid',
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('No image generated');
    }

    const imageUrl = response.data[0].url;

    if (!imageUrl) {
      throw new Error('No image URL in response');
    }

    return Response.json({
      imageUrl,
      revisedPrompt: response.data[0].revised_prompt
    });
  } catch (error) {
    console.error('Error generating poster:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json(
      { error: `Failed to generate poster: ${errorMessage}` },
      { status: 500 }
    );
  }
}
