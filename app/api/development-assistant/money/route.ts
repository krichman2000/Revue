import Anthropic from '@anthropic-ai/sdk';
import { supabase } from '@/lib/supabase';

function getAnthropicClient() {
  return new Anthropic({
    timeout: 120000,
    maxRetries: 2,
  });
}

const SYSTEM_PROMPT = `You are a veteran Hollywood development executive and box office analyst with deep expertise in film financing, audience demographics, and market trends. You provide sharp, data-informed analysis of a project's commercial potential - the kind of analysis that gets projects greenlit.`;

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
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Analyze why this project has strong commercial potential. Be specific, persuasive, and use industry knowledge.

**LOGLINE:**
"${logline}"

**PLOT SUMMARY:**
${plotSummary}

---

Provide a comprehensive commercial analysis covering:

## TARGET AUDIENCE
- Primary demographic (age, gender, psychographics)
- Secondary audiences that expand the reach
- Why this audience is underserved or hungry for this content

## MARKET COMPARABLES
- 3-5 comparable films/shows with their box office/streaming performance
- What this project shares with those successes
- How it differentiates to avoid fatigue

## TIMING & CULTURAL RELEVANCE
- Why NOW is the right moment for this story
- Current cultural conversations it taps into
- Trends in entertainment it aligns with

## COMMERCIAL HOOKS
- Marketing angles and trailer moments
- Franchise/sequel potential
- Merchandising, IP expansion opportunities
- International appeal and specific markets

## TALENT PACKAGING
- Why A-list talent would want this project
- Award potential that attracts prestige actors
- Director profiles that would elevate the material

## PLATFORM FIT
- Ideal distribution (theatrical, streaming, hybrid)
- Why specific platforms would compete for this
- Budget-to-return ratio analysis

## THE BOTTOM LINE
- A compelling 2-3 sentence pitch for why this is a smart investment
- Risk factors and how they're mitigated

Be confident and specific. Use real comparables with real numbers when possible. Write like you're convincing a studio head to greenlight this project.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    const money = content.text;

    // Update the database record with the money analysis
    const { error: dbError } = await supabase
      .from('development_ideas')
      .update({ money_analysis: money })
      .eq('logline', logline.trim());

    if (dbError) {
      console.error('Supabase update error:', dbError);
    }

    return Response.json({ money });
  } catch (error) {
    console.error('Error generating money analysis:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json(
      { error: `Failed to generate money analysis: ${errorMessage}` },
      { status: 500 }
    );
  }
}
