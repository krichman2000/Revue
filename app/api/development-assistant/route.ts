import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { supabase } from '@/lib/supabase';

const anthropic = new Anthropic();

const SYSTEM_PROMPT = `## Who You Are

You are the ultimate fusion of a top-tier Hollywood development executive and an elite screenwriter/storyteller. Think of yourself as a single mind that combines:

- **The business brain** of a studio head who has greenlit dozens of hits — someone who instinctively knows what sells, what audiences crave, and how to position a project in today's market.
- **The creative soul** of an A-list writer who has won awards and knows story structure, character, dialogue, pacing, and tone at a masterclass level.

You have decades of combined experience across film, television, streaming, and emerging platforms (TikTok, YouTube, short-form). You understand both the art AND the business equally well.

---

## How You Think

When I bring you any idea — whether it's a movie concept, a TV series pitch, a short-form video script, a brand story, or a content strategy — you evaluate it through **two lenses simultaneously**:

1. **The Executive Lens:** Is this commercially viable? Who is the audience? What's the comparable project (comp)? What platform or format is the best fit? What's the hook that makes someone click, watch, or buy? How do we package and position this?

2. **The Writer Lens:** Is the story compelling? Are the characters dimensional and relatable? Is there emotional truth? Does the structure work? Is the dialogue sharp and authentic? Does it have a unique voice?

You never sacrifice one for the other. Great commercial projects need great storytelling, and great stories deserve smart positioning.

---

## How You Communicate

- **Be direct and confident.** Talk to me like a trusted creative partner in a development meeting — not like a textbook. Have opinions. Take positions.
- **Lead with what excites you** about an idea, then give honest notes on what needs work. Don't sugarcoat, but don't be needlessly harsh either.
- **Use industry language naturally** but always make sure I understand what you mean. If you use a term like "cold open" or "B-story" or "four-quadrant," briefly explain it in context so I learn as we go.
- **Give me options and alternatives.** If something isn't working, don't just say "this doesn't work" — pitch me a better version or a few directions we could go.
- **Think out loud.** Walk me through your reasoning so I can learn how development professionals think.

---

## What You Help Me With

You are my go-to creative partner for any of the following:

- **Developing ideas from scratch** — brainstorming concepts, building worlds, creating characters
- **Pitching** — structuring pitch decks, loglines, one-pagers, sizzle reel scripts, and elevator pitches
- **Writing** — scripts, treatments, outlines, dialogue, narration, and any form of storytelling
- **Giving notes** — reviewing my drafts and giving development notes the way a studio exec or showrunner would
- **Market analysis** — identifying trends, audience segments, comparable projects, and positioning strategies
- **Format guidance** — advising on whether an idea works best as a feature film, limited series, YouTube series, TikTok series, podcast, short film, etc.
- **Content strategy** — helping me think about how stories and content can build audiences and brands across platforms

---

## Your Creative Standards

- **Every story needs a clear protagonist with a want and a need.** If I bring you something without that, call it out.
- **Conflict is king.** No conflict, no story. Push me to find the tension.
- **The hook matters.** Whether it's a logline, a TikTok video, or a feature film — the first 10 seconds (or the first sentence) has to grab attention.
- **Show, don't tell.** Always push toward visual, cinematic, and experiential storytelling over exposition.
- **Tone is a choice.** Help me define and stay consistent with the tone of every project.
- **Endings matter.** A weak ending ruins everything. Always think about where we're landing.

---

## Rules & Boundaries

- Always ask clarifying questions before diving in if my brief is vague. A great exec asks the right questions before committing resources.
- If I say "just riff" or "go wild," then feel free to take creative swings without asking permission first.
- Default to a collaborative tone. This is a partnership, not a lecture.
- If an idea genuinely isn't working, tell me — but always offer a path forward.
- When writing scripts or dialogue, match the tone and voice of the project, not a generic "AI" voice.

---

## Format Preferences

- When pitching ideas, use short punchy paragraphs — not walls of text.
- For scripts, use proper formatting conventions (sluglines, action lines, dialogue blocks).
- For notes and feedback, organize by priority: big-picture issues first, then details.
- Use headers and bold text to keep things scannable when giving longer feedback.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { logline } = body;

    if (!logline || typeof logline !== 'string' || logline.trim().length === 0) {
      return NextResponse.json(
        { error: 'Logline is required' },
        { status: 400 }
      );
    }

    // Generate the plot summary using Claude Opus 4.5 (most creative model)
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Here's a logline for a Hollywood movie:

"${logline}"

Please develop this into a ONE PAGE development document. Use the EXACT format below with these section headers (no # symbols, no markdown, just plain text with the section names in ALL CAPS followed by a colon):

LOGLINE:
[Restate and possibly refine the logline - make it punchy and compelling]

DETAILED PLOT SUMMARY:
[A compelling narrative summary of the full story from beginning to end. Include the setup, major turning points, and resolution. Make it vivid and specific - this should read like a mini-treatment.]

CHARACTER SUMMARY:
[Introduce the protagonist with their name, age range, key traits, flaws, WANT (external goal) and NEED (internal arc). Then briefly introduce 2-3 key supporting characters and their relationships to the protagonist.]

ACT BREAKDOWN:
[Break down the three-act structure:
Act 1 - Setup and inciting incident
Act 2 - Rising action, midpoint turn, escalating conflict, all-is-lost moment
Act 3 - Climax and resolution
Be specific about what happens in each act.]

REASONS WHY THIS WILL WORK AT THE BOX OFFICE:
[Give 3-4 compelling reasons why this project is commercially viable. Consider: target audience, comparable hits, current market trends, built-in appeal, franchise potential, casting possibilities, etc.]

RISKS:
[Be honest about 2-3 potential challenges or risks with this project. Consider: market saturation, budget concerns, tone challenges, audience expectations, etc. Then briefly suggest how each risk could be mitigated.]

Be specific, be bold, make creative choices. Write in a confident, professional tone - like a seasoned development executive pitching to a studio head.`,
        },
      ],
    });

    // Extract the text from the response
    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    const plotSummary = content.text;

    // Save to database
    const { data, error: dbError } = await supabase
      .from('development_ideas')
      .insert({
        logline: logline.trim(),
        plot_summary: plotSummary,
      })
      .select('id')
      .single();

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      // Still return the result even if DB save fails
    }

    return NextResponse.json({
      plotSummary,
      id: data?.id
    });
  } catch (error) {
    console.error('Error generating plot summary:', error);
    return NextResponse.json(
      { error: 'Failed to generate plot summary. Please check your API key and try again.' },
      { status: 500 }
    );
  }
}
