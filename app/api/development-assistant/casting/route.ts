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
      max_tokens: 2048,
      system: `You are a top Hollywood casting director with 30 years of experience. You have an encyclopedic knowledge of actors - their strengths, screen presence, salary ranges, and past roles. You think strategically about casting for both creative fit AND commercial viability.`,
      messages: [
        {
          role: 'user',
          content: `Based on this project, provide detailed casting suggestions:

LOGLINE: "${logline}"

PLOT/CHARACTER SUMMARY:
${plotSummary}

---

For each main character, suggest 3 actors at different levels:

FORMAT (use this exact structure):

[CHARACTER NAME] - [Brief character description]

DREAM CASTING (A-List / $20M+ quote):
[Actor Name] - [Why they're perfect for this role - be specific about past roles that demonstrate their fit]

SMART MONEY (Established star / $5-15M):
[Actor Name] - [Why this is a savvy choice - reference specific performances]

RISING STAR (Breakout potential / Under $2M):
[Actor Name] - [Why this could be their star-making role]

---

Cover the protagonist and 2-3 key supporting roles. Be bold with your choices - think like a casting director who wants to make this movie undeniable to financiers.

End with a brief "PACKAGING NOTE" about which combination would be most likely to get this movie greenlit and why.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    return Response.json({ casting: content.text });
  } catch (error) {
    console.error('Error generating casting suggestions:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json(
      { error: `Failed to generate casting suggestions: ${errorMessage}` },
      { status: 500 }
    );
  }
}
