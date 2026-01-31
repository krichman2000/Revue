import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { updateFavoriteFoodAndCity } from '@/lib/csv';

const anthropic = new Anthropic();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, favoriteFood, favoriteCity } = body;

    if (!favoriteFood || !favoriteCity) {
      return NextResponse.json(
        { error: 'Favorite food and city are required' },
        { status: 400 }
      );
    }

    // Update the CSV with the favorite food and city
    if (id) {
      updateFavoriteFoodAndCity(id, favoriteFood, favoriteCity);
    }

    // Generate the story using Claude
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Write a fun, engaging 500-word story about "Andrew Singer" taking someone to a restaurant in ${favoriteCity} to eat ${favoriteFood}.

Andrew Singer is a creative executive at Revue Studios and Broadway Video, the legendary production company behind Saturday Night Live. He has deep roots in the entertainment industry and is known for his passion for discovering new talent, his love of great food, and his ability to turn any meal into an unforgettable experience. He's well-connected in both the comedy and entertainment worlds.

The story should be vivid, descriptive, and entertaining. Include sensory details about the food and the location. Weave in Andrew's background in entertainment naturally - perhaps he shares industry anecdotes or spots a celebrity. Make it feel like a memorable adventure with this charismatic entertainment industry insider.`,
        },
      ],
    });

    // Extract the text from the response
    const storyContent = message.content[0];
    if (storyContent.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    return NextResponse.json({ story: storyContent.text });
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json(
      { error: 'Failed to generate story. Please check your API key.' },
      { status: 500 }
    );
  }
}
