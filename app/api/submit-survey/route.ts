import { NextResponse } from 'next/server';
import { appendSurveyResponse } from '@/lib/csv';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { aiLearning, toolsUsed, movieIdea } = body;

    if (!aiLearning || !toolsUsed || !movieIdea) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const id = appendSurveyResponse({
      aiLearning,
      toolsUsed,
      movieIdea,
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error saving survey:', error);
    return NextResponse.json(
      { error: 'Failed to save survey' },
      { status: 500 }
    );
  }
}
