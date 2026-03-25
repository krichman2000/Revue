import Anthropic from '@anthropic-ai/sdk';

function getAnthropicClient() {
  return new Anthropic({
    timeout: 120000,
    maxRetries: 2,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { logline, plotSummary } = body;

    if (!logline || !plotSummary) {
      return Response.json(
        { error: 'Logline and plot summary are required' },
        { status: 400 }
      );
    }

    const anthropic = getAnthropicClient();
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      system: `You are an A-list Hollywood screenwriter known for your gripping openings. You write in proper screenplay format. Your opening scenes are famous for hooking readers in the first page and establishing tone, character, and stakes immediately. You write visually - every line can be filmed. Your dialogue is sharp, subtext-rich, and sounds like real people talking.`,
      messages: [
        {
          role: 'user',
          content: `Write the opening 2-3 pages of this screenplay. This should be a COLD OPEN that grabs the reader immediately.

LOGLINE: "${logline}"

STORY CONTEXT:
${plotSummary}

---

Write in proper screenplay format:

- FADE IN:
- Scene headings: INT./EXT. LOCATION - DAY/NIGHT
- Action lines: Present tense, visual, cinematic (no "we see" or "we hear")
- Character names in CAPS on first introduction with brief (age, key trait) description
- Dialogue centered with character name above
- Parentheticals used sparingly

The opening should:
1. Establish the world/tone immediately
2. Hook us with mystery, tension, or an arresting image
3. Introduce or hint at our protagonist
4. Make the reader NEED to turn the page

Write 2-3 pages (roughly 2-3 minutes of screen time). End on a moment that propels us into the story.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    return Response.json({ opening: content.text });
  } catch (error) {
    console.error('Error generating opening scene:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json(
      { error: `Failed to generate opening scene: ${errorMessage}` },
      { status: 500 }
    );
  }
}
