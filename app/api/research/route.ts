import Anthropic from '@anthropic-ai/sdk';

function getAnthropicClient() {
  return new Anthropic({
    timeout: 120000,
    maxRetries: 5,
  });
}

const SYSTEM_PROMPT = `You are a literary scout and book researcher with deep expertise in publishing, book sales data, and critical reception. You have extensive knowledge of:

- Bestseller lists (NYT, Amazon, indie bookstores)
- Book review aggregators and critical reception
- Publishing industry sales data and trends
- Award winners and nominees (Pulitzer, Booker, National Book Award, etc.)
- Genre fiction performance and fan communities
- International bestsellers and translation rights
- Books that have been successfully adapted to film/TV
- Upcoming releases and buzzy titles

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
6. Sales and review information (bestseller status, awards, critical reception, adaptation status if any)

Focus on books that:
- Are well-reviewed and/or commercially successful
- Would have strong adaptation potential for film/TV
- Are from reputable publishers
- Have verifiable sales/review data

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
