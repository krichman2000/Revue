import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

export async function POST(request: Request) {
  try {
    const { personName } = await request.json();

    if (!personName || typeof personName !== 'string' || personName.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please provide a person name' },
        { status: 400 }
      );
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: `Research and provide comprehensive information about ${personName.trim()} for meeting preparation. Include:

1. **Background & Biography**: Who they are, their current role/position, career history, education, and notable achievements.

2. **Professional Focus**: What they're known for, their areas of expertise, recent projects or initiatives, and their professional reputation.

3. **Personal Interests & Style**: Any known hobbies, communication style, values they champion, causes they support, or personality traits noted in interviews/profiles.

4. **Conversation Topics**: Key talking points, recent news about them, shared interests you could discuss, and topics to potentially avoid.

5. **Meeting Prep Tips**: How to best approach a conversation with them, what they likely value in interactions, and any cultural or professional considerations.

---

**Gift Recommendations**

Based on their interests, personality, and professional context, suggest 3 thoughtful gift ideas:

**Gift 1**: [Name]
- Description: [What it is and why it's appropriate]
- Price Range: [Approximate cost]
- Where to Get: [Suggested retailer or source]

**Gift 2**: [Name]
- Description: [What it is and why it's appropriate]
- Price Range: [Approximate cost]
- Where to Get: [Suggested retailer or source]

**Gift 3**: [Name]
- Description: [What it is and why it's appropriate]
- Price Range: [Approximate cost]
- Where to Get: [Suggested retailer or source]

If this is a well-known public figure, provide accurate information based on publicly available sources. If this is not a recognizable name, provide a helpful framework for researching this person and suggest generic but thoughtful professional gift options.`
        }
      ]
    });

    const content = message.content[0];
    const bio = content.type === 'text' ? content.text : '';

    return NextResponse.json({ bio, personName: personName.trim() });
  } catch (error) {
    console.error('Error generating bio:', error);
    return NextResponse.json(
      { error: 'Failed to generate bio. Please try again.' },
      { status: 500 }
    );
  }
}
