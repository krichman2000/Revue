import Anthropic from '@anthropic-ai/sdk';

function getAnthropicClient() {
  return new Anthropic({
    timeout: 120000,
    maxRetries: 5,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { executiveName } = body;

    if (!executiveName || typeof executiveName !== 'string' || executiveName.trim().length === 0) {
      return Response.json(
        { error: 'Executive name is required' },
        { status: 400 }
      );
    }

    // Search for executive information using web search
    const searchQueries = [
      `${executiveName} entertainment executive content strategy interview`,
      `${executiveName} what kind of shows movies looking for`,
      `${executiveName} greenlighting decisions quotes`,
    ];

    // Perform web searches
    const searchResults: string[] = [];

    for (const query of searchQueries) {
      try {
        const searchResponse = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=5`, {
          headers: {
            'Accept': 'application/json',
            'X-Subscription-Token': process.env.BRAVE_API_KEY || '',
          },
        });

        if (searchResponse.ok) {
          const data = await searchResponse.json();
          if (data.web?.results) {
            for (const result of data.web.results) {
              searchResults.push(`Title: ${result.title}\nDescription: ${result.description}\nURL: ${result.url}\n`);
            }
          }
        }
      } catch (searchError) {
        console.error('Search error:', searchError);
      }
    }

    // If no Brave API key or search failed, use Claude's knowledge
    const anthropic = getAnthropicClient();

    const searchContext = searchResults.length > 0
      ? `Here are recent search results about this executive:\n\n${searchResults.join('\n---\n')}`
      : 'No recent search results available. Please use your knowledge about this executive and their role in the industry.';

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `Research the entertainment executive: ${executiveName}

${searchContext}

Please provide a comprehensive executive profile with the following sections:

EXECUTIVE OVERVIEW:
[Current role, career history, notable achievements. 2-3 sentences.]

CONTENT PREFERENCES:
[Based on their public statements, interviews, and track record - what types of content do they gravitate toward? What genres, themes, tones do they champion? What have they greenlit or passed on? Be specific.]

DECISION-MAKING STYLE:
[How do they evaluate projects? Are they data-driven, instinct-driven, talent-focused? What do they look for in a pitch? Any known pet peeves or deal-breakers?]

RECENT PRIORITIES:
[Based on recent interviews or company strategy - what are they currently looking for? Any gaps in their slate they've mentioned? Strategic priorities?]

HOW TO PITCH TO THEM:
[Specific tactical advice for pitching to this executive. What should you emphasize? What language resonates with them? What format do they prefer?]

NOTABLE QUOTES:
[2-3 direct quotes from interviews if available, or paraphrased positions they're known for.]

If you don't have specific information about this executive, provide your best assessment based on their known role and company, and note where you're making educated inferences vs. citing specific statements.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    return Response.json({
      executiveProfile: content.text,
      executiveName: executiveName.trim(),
      searchResultsFound: searchResults.length > 0,
    });
  } catch (error) {
    console.error('Error researching executive:', error);

    // Check for overload error
    const errorString = String(error);
    if (errorString.includes('overloaded') || errorString.includes('529')) {
      return Response.json(
        { error: 'AI service is temporarily busy. Please try again in a few seconds.' },
        { status: 503 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json(
      { error: `Failed to research executive: ${errorMessage}` },
      { status: 500 }
    );
  }
}
