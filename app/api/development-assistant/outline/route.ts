import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { supabase } from '@/lib/supabase';

const anthropic = new Anthropic();

const SYSTEM_PROMPT = `You are an elite Hollywood screenwriter and story architect. You create detailed, professional screenplay outlines that serve as blueprints for writers. Your outlines are specific, visual, and emotionally resonant - never generic or vague.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { logline, plotSummary } = body;

    if (!logline || !plotSummary) {
      return NextResponse.json(
        { error: 'Logline and plot summary are required' },
        { status: 400 }
      );
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Based on this logline and plot summary, create a detailed SCENE-BY-SCENE OUTLINE for a feature film screenplay.

**LOGLINE:**
"${logline}"

**PLOT SUMMARY:**
${plotSummary}

---

Create a comprehensive outline with the following structure:

## ACT ONE (Pages 1-25)

Break down into 8-10 specific scenes. For each scene include:
- **Scene #** - INT/EXT. LOCATION - DAY/NIGHT
- What happens (2-3 sentences)
- The emotional beat/purpose of the scene

Include: Opening image, introduction of protagonist in their ordinary world, the inciting incident, and the Act One turning point.

## ACT TWO-A (Pages 25-55)

Break down into 10-12 specific scenes covering:
- Protagonist entering the new world/situation
- Meeting allies and antagonists
- Rising stakes and complications
- Building to the MIDPOINT

## MIDPOINT (Page 55)

One pivotal scene that changes everything - describe in detail.

## ACT TWO-B (Pages 55-85)

Break down into 10-12 specific scenes covering:
- Consequences of the midpoint
- Escalating conflict
- The "all is lost" moment
- Dark night of the soul

## ACT THREE (Pages 85-110)

Break down into 8-10 specific scenes covering:
- The protagonist's realization/decision
- Final preparation
- Climactic confrontation
- Resolution and final image

---

Be SPECIFIC with scene locations, character names, and actions. This should read like a real development document, not a generic template.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    const outline = content.text;

    // Update the database record with the outline
    const { error: dbError } = await supabase
      .from('development_ideas')
      .update({ outline })
      .eq('logline', logline.trim());

    if (dbError) {
      console.error('Supabase update error:', dbError);
    }

    return NextResponse.json({ outline });
  } catch (error) {
    console.error('Error generating outline:', error);
    return NextResponse.json(
      { error: 'Failed to generate outline. Please try again.' },
      { status: 500 }
    );
  }
}
