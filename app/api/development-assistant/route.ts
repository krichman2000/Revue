import Anthropic from '@anthropic-ai/sdk';
import { supabase } from '@/lib/supabase';

// Create a new client for each request to avoid connection issues
function getAnthropicClient() {
  return new Anthropic({
    timeout: 120000, // 2 minute timeout
    maxRetries: 2,
  });
}

function getPlatformContext(platform: string) {
  const platforms: Record<string, { name: string; sensibility: string; audience: string; tone: string; examples: string }> = {
    theatrical: {
      name: 'Theatrical Release',
      sensibility: 'Big-screen spectacle with broad appeal. Four-quadrant potential. Visual grandeur and communal viewing experience. Strong opening weekend hooks.',
      audience: 'General audiences seeking event entertainment. Date nights, families, groups of friends.',
      tone: 'Bold, cinematic, emotionally accessible. Clear heroes and villains. Satisfying crowd-pleasing moments.',
      examples: 'Top Gun: Maverick, Oppenheimer, Barbie, Avatar, A Quiet Place',
    },
    netflix: {
      name: 'Netflix',
      sensibility: 'Bingeable, high-concept hooks. Strong "what if" premises. Global appeal with diverse casting. Algorithm-friendly clear genres with a twist.',
      audience: 'Global subscribers across all demographics. Skews younger (18-49). Values convenience and variety.',
      tone: 'Accessible but not dumbed down. Can be darker/edgier than broadcast. Cliffhanger-driven for series.',
      examples: 'Stranger Things, Wednesday, Glass Onion, Bird Box, The Queen\'s Gambit',
    },
    hbomax: {
      name: 'Max (HBO)',
      sensibility: 'Prestige quality. Complex, morally ambiguous characters. Literary adaptations. Auteur-driven vision. Award-worthy performances.',
      audience: 'Sophisticated viewers who appreciate quality. Skews older and more affluent. Values craft and depth.',
      tone: 'Elevated, nuanced, unflinching. Willing to be challenging. Character over plot. Subtext matters.',
      examples: 'Succession, The Last of Us, White Lotus, Euphoria, True Detective',
    },
    disneyplus: {
      name: 'Disney+',
      sensibility: 'Family-friendly with multi-generational appeal. Franchise/IP extensions. Aspirational heroes. Magic and wonder. Emotional heart.',
      audience: 'Families with children. Disney/Marvel/Star Wars fans. Values wholesome entertainment.',
      tone: 'Optimistic, heartwarming, adventure-driven. Clear moral compass. Humor that works for all ages.',
      examples: 'The Mandalorian, Moana, Encanto, Loki, WandaVision',
    },
    paramountplus: {
      name: 'Paramount+',
      sensibility: 'Franchise-driven (Star Trek, Yellowstone universe, Mission Impossible). Mix of prestige and populist. Strong IP exploitation.',
      audience: 'Loyal franchise fans. Heartland America. Values familiar brands with fresh takes.',
      tone: 'Varies by franchise but generally accessible. Balance of action and character. Legacy respect.',
      examples: 'Yellowstone, 1883, Star Trek: Strange New Worlds, Mayor of Kingstown',
    },
    other: {
      name: 'Streaming/Cable',
      sensibility: 'Flexible based on buyer. Focus on strong concept and execution. Marketable elements.',
      audience: 'Defined by the specific project and its natural audience.',
      tone: 'Adaptable to the material. Let the story dictate the approach.',
      examples: 'Various successful projects across platforms',
    },
  };

  return platforms[platform] || platforms.other;
}

function getBudgetContext(budget: string) {
  const budgets: Record<string, { range: string; constraints: string; casting: string; scope: string; examples: string }> = {
    micro: {
      range: '$1-5 Million',
      constraints: 'Single or minimal locations. Small cast (under 10 speaking roles). No major VFX. Shoot in under 25 days. Often single-camera, natural lighting.',
      casting: 'Unknown or emerging talent. Maybe one recognizable face in a supporting role. Focus on acting chops over star power.',
      scope: 'Intimate, contained stories. Bottle episodes. Character studies. Dialogue-driven. The limitations become creative strengths.',
      examples: 'Whiplash, The Blair Witch Project, Clerks, Paranormal Activity, Moonlight',
    },
    low: {
      range: '$5-15 Million',
      constraints: 'Limited locations (under 20). Modest cast. Minimal VFX or practical effects. 25-35 day shoot. Some production value but smart choices.',
      casting: 'Rising stars or established character actors. One "name" possible. Talent looking for meaty roles over paychecks.',
      scope: 'Focused narratives with some scope. Can have one or two set pieces. Genre elements possible if clever.',
      examples: 'Get Out, Juno, Little Miss Sunshine, The Big Sick, Lady Bird',
    },
    moderate: {
      range: '$15-35 Million',
      constraints: 'Multiple locations. Growing cast size. Moderate VFX budget. 35-45 day shoot. Solid production value.',
      casting: 'Rising stars with heat. Strong character actor ensemble. One established name possible as anchor.',
      scope: 'Expanding narrative scope. Multiple set pieces. Some period or genre elements achievable.',
      examples: 'A Quiet Place, Hereditary, The Farewell, Booksmart, Us',
    },
    mid: {
      range: '$35-55 Million',
      constraints: 'Significant location variety. Full cast. Real VFX capability. 45-60 day shoot. Full production value.',
      casting: 'Name talent attachment expected. Mix of established stars and rising talent. Strong ensemble possible.',
      scope: 'Full narrative scope. Major set pieces. Period pieces viable. Genre flexibility.',
      examples: 'Knives Out, John Wick, The Hangover, Crazy Rich Asians, Everything Everywhere All At Once',
    },
    high: {
      range: '$55-100 Million',
      constraints: 'Major scope. Multiple significant locations. Substantial VFX. 60-80 day shoot. Full studio resources.',
      casting: 'A-list attachment expected. Star-driven package. Multiple recognizable names.',
      scope: 'Expansive storytelling. Major action sequences. Full period capability. Significant world-building.',
      examples: 'Joker, La La Land, Bohemian Rhapsody, A Star Is Born, Elvis',
    },
    tentpole: {
      range: '$100 Million+',
      constraints: 'No real constraints. Global production. Massive VFX. Extended shoots. Franchise infrastructure.',
      casting: 'Major stars required. Often IP-driven where character IS the star. Ensemble of A-listers possible.',
      scope: 'Spectacle and scale. Global stakes. Franchise/sequel potential mandatory. Four-quadrant appeal required.',
      examples: 'Avatar, Avengers, Mission: Impossible, Oppenheimer, Top Gun: Maverick, Dune',
    },
  };

  return budgets[budget] || budgets.mid;
}

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
    const { logline, format = 'movie', platform = 'netflix', budget = 'mid', executiveName, executiveProfile } = body;

    if (!logline || typeof logline !== 'string' || logline.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Logline is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const formatLabel = format === 'movie' ? 'Feature Film' : 'Limited Series';
    const platformInfo = getPlatformContext(platform);
    const budgetInfo = getBudgetContext(budget);

    // Build executive context if provided
    const executiveContext = executiveName && executiveProfile ? `

EXECUTIVE TARGET: ${executiveName}
You are pitching DIRECTLY to ${executiveName}. Here is their profile based on research:

${executiveProfile}

CRITICAL: Tailor EVERY aspect of this pitch to appeal specifically to ${executiveName}'s known preferences, decision-making style, and strategic priorities. Reference their past decisions and stated preferences where relevant. Frame the pitch in language and concepts that will resonate with them personally.` : '';

    // Verify API key is set
    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'ANTHROPIC_API_KEY is not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const anthropic = getAnthropicClient();

    // Use non-streaming for reliability
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Here's a logline for a ${formatLabel} being developed for ${platformInfo.name} with a ${budgetInfo.range} budget:

"${logline}"
${executiveContext}

PLATFORM CONTEXT FOR ${platformInfo.name.toUpperCase()}:
- Sensibility: ${platformInfo.sensibility}
- Target Audience: ${platformInfo.audience}
- Tone: ${platformInfo.tone}
- Comparable Titles: ${platformInfo.examples}

BUDGET CONTEXT (${budgetInfo.range}):
- Production Constraints: ${budgetInfo.constraints}
- Casting Tier: ${budgetInfo.casting}
- Achievable Scope: ${budgetInfo.scope}
- Comparable Titles at this Budget: ${budgetInfo.examples}

Please develop this into a pitch document SPECIFICALLY TAILORED for ${platformInfo.name} at the ${budgetInfo.range} budget level. The development should reflect this platform's unique sensibility AND be realistic about what's achievable at this budget. Smart budgeting is a selling point - show you understand the economics.

Use the EXACT format below (no # symbols, no markdown, just plain text with section names in ALL CAPS):

LOGLINE:
[Restate and refine the logline - tailor it specifically for ${platformInfo.name}'s sensibility]

DETAILED PLOT SUMMARY:
[A compelling narrative summary of the full story. ${format === 'series' ? 'Structure this as a limited series with clear episode breaks and season arc. Include pilot episode hook and season finale payoff.' : 'Structure this as a feature film with clear three-act structure.'} Emphasize elements that align with ${platformInfo.name}'s brand and audience expectations.]

CHARACTER SUMMARY:
[Protagonist with name, age range, traits, flaws, WANT and NEED. Then 2-3 key supporting characters. Design these characters to resonate with ${platformInfo.name}'s core audience. Consider casting tier appropriate for this platform.]

${format === 'series' ? `SERIES STRUCTURE:
[Episode breakdown for Season 1. Include episode count recommendation (6, 8, or 10 episodes). Brief description of each episode's focus and how it builds the season arc. End with potential Season 2 directions if applicable.]` : `ACT BREAKDOWN:
[Three-act structure with specific beats optimized for ${platform === 'theatrical' ? 'theatrical pacing and big-screen experience' : 'home viewing engagement'}. Include key set pieces and emotional turning points.]`}

WHY ${platformInfo.name.toUpperCase()} WILL WANT THIS:
[4-5 specific reasons why this project is perfect for ${platformInfo.name}. Reference their current slate, gaps in their library, audience data, and strategic priorities. Be specific about comparable titles and how this fits their brand.]

PACKAGING NOTES:
[Suggest ideal talent attachments (director, writer, stars) that would make this irresistible to ${platformInfo.name}. Be realistic about the ${budgetInfo.range} budget - suggest talent who would actually do this project at this level. Consider their existing relationships with ${platformInfo.name}.]

BUDGET BREAKDOWN STRATEGY:
[Explain how to maximize the ${budgetInfo.range} budget. Where should the money go? What creative solutions keep costs down without sacrificing quality? What's the "money on screen" strategy?]

RISKS & MITIGATIONS:
[2-3 challenges specific to this project at ${platformInfo.name} and smart ways to address them.]
${executiveName ? `
TAILORED FOR ${executiveName.toUpperCase()}:
[Specific talking points for your meeting with ${executiveName}. What aspects of this project will appeal to their known preferences? What language should you use? What comparisons will resonate with them? How should you frame this to match their decision-making style?]` : ''}

Be specific, be bold, make creative choices. Write like a seasoned development executive who knows ${platformInfo.name}'s slate inside and out and is pitching directly to their team.${executiveName ? ` You are preparing to pitch to ${executiveName} personally - make every word count for that specific meeting.` : ''}`,
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
    const { error: dbError } = await supabase
      .from('development_ideas')
      .insert({
        logline: logline.trim(),
        plot_summary: plotSummary,
      });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
    }

    return Response.json({ plotSummary });
  } catch (error) {
    console.error('Error generating plot summary:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate plot summary. Please check your API key and try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
