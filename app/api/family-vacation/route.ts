import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, favoriteMovie, scaredOf } = body;

    if (!name || !favoriteMovie || !scaredOf) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Generate the story using Claude
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `Write an engaging, heartwarming story of at least 250 words (aim for 300-400 words) that incorporates the following elements:

MAIN CHARACTER: ${name}
FAVORITE MOVIE: ${favoriteMovie}
FEAR: ${scaredOf}

REQUIRED CHARACTERS TO INCLUDE:
- Amy and Marvin: A loving couple in their early 80s who live in Scottsdale, Arizona. Amy was a dedicated teacher for over 40 years and still has that nurturing, patient demeanor. Marvin was a successful real estate developer who built many of the neighborhoods in the Phoenix area. They've been married for 58 years and love hosting family gatherings.

STORY REQUIREMENTS:
1. The story should be about a family vacation or gathering that brings ${name} together with Amy and Marvin
2. Naturally weave in ${name}'s love of the movie "${favoriteMovie}" - perhaps they watch it together, quote it, or something from the movie becomes relevant to the plot
3. ${name}'s fear of ${scaredOf} should play a role in the story - maybe they overcome it with Amy and Marvin's help, or it creates a funny/touching moment
4. Include warm details about Amy and Marvin's personalities - Amy's teacher wisdom, Marvin's developer eye for detail and building things
5. The tone should be warm, family-oriented, and memorable
6. Make it feel like a cherished family memory

Write the story in a vivid, engaging style with dialogue and sensory details.`,
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
      { error: 'Failed to generate story. Please try again.' },
      { status: 500 }
    );
  }
}
