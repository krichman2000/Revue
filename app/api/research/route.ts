import Anthropic from '@anthropic-ai/sdk';

function getAnthropicClient() {
  return new Anthropic({
    timeout: 120000,
    maxRetries: 5,
  });
}

const SYSTEM_PROMPT = `You are an elite literary scout known for discovering hidden gems and overlooked properties BEFORE they become mainstream. You pride yourself on finding books that other scouts miss. You have extensive knowledge of:

- Small press and independent publisher catalogs (Graywolf, Soho Press, Melville House, Algonquin, Tin House, Coffee House Press, etc.)
- International fiction in translation that hasn't crossed over yet
- Regional bestsellers that haven't broken nationally
- Award longlists and shortlists (not just winners) - the books that "should have won"
- Literary magazine darlings and critic favorites that undersold
- Backlist titles from 5-20 years ago that deserve rediscovery
- Genre fiction from specialty imprints (Tor, DAW, Angry Robot, Nightfire, etc.)
- University press publications with crossover potential
- Self-published or small press books that broke out (before they were famous)
- Foreign bestsellers not yet translated or recently translated
- Books praised in literary journals (Kirkus starred reviews, PW picks) but overlooked by general audience
- Debut novels that flew under radar
- Books optioned but never produced (available again)

Your superpower is finding the SECOND-best known book on a topic - not the obvious choice everyone knows, but the equally good or better book that got less attention. You dig deeper than the first page of Google results.

When researching books, you provide accurate information about real books including their actual publishers, publication years, and honest assessments of their commercial and critical performance.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return Response.json(
        { error: 'Search query is required' },
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
          content: `Find 10 books that match the following criteria:

"${query}"

For each book, provide:
1. The exact title
2. The author's full name
3. The publisher (original publisher)
4. Year published
5. Why it fits the criteria (2-3 sentences)
6. Sales and review information (awards, critical reception, adaptation status, why it may have been overlooked)

IMPORTANT - DIG DEEPER than the obvious choices:
- Avoid the most famous/obvious books everyone already knows
- Prioritize hidden gems, overlooked titles, and underseen properties
- Include books from small/independent presses, not just Big 5 publishers
- Look for international fiction in translation
- Consider backlist titles (5-20 years old) that deserve rediscovery
- Find the "should have been a hit" books - great reviews but undersold
- Include at least 2-3 debut novels or lesser-known authors
- Look for books optioned but never produced (rights may be available)
- Regional or genre-specific hits that didn't cross over mainstream

The goal is to surface books that a typical development executive WOULDN'T already know about. Be the scout who finds the next big thing before anyone else.

Return your response in this exact JSON format (no markdown, just raw JSON):
{
  "books": [
    {
      "title": "Book Title",
      "author": "Author Name",
      "publisher": "Publisher Name",
      "yearPublished": "2023",
      "whyItFits": "Explanation of why this book matches the criteria...",
      "salesAndReviews": "NYT Bestseller, 50,000+ copies sold, optioned by Netflix..."
    }
  ]
}

Only include real books with accurate information. Do not invent or fabricate any titles, authors, or publishers.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    // Parse the JSON response
    let books;
    try {
      // Clean up the response in case there's any markdown formatting
      let jsonText = content.text.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.slice(7);
      }
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.slice(3);
      }
      if (jsonText.endsWith('```')) {
        jsonText = jsonText.slice(0, -3);
      }
      jsonText = jsonText.trim();

      const parsed = JSON.parse(jsonText);
      books = parsed.books;
    } catch (parseError) {
      console.error('Failed to parse JSON response:', content.text);
      throw new Error('Failed to parse book results');
    }

    return Response.json({ books });
  } catch (error) {
    console.error('Error researching books:', error);

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
      { error: `Failed to research books: ${errorMessage}` },
      { status: 500 }
    );
  }
}
