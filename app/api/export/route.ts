import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/api/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Check rate limit (1 request per minute)
    const rateLimited = await rateLimit(req);
    if (rateLimited) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait before trying again.' },
        { status: 429 }
      );
    }

    const { frames, aspectRatio } = await req.json();

    if (!frames || !Array.isArray(frames) || frames.length === 0) {
      return NextResponse.json(
        { error: 'Invalid frames data' },
        { status: 400 }
      );
    }

    // For now, we'll return the first frame as a demo
    // In a production environment, this would connect to a cloud service
    const demoFrame = frames[0];
    
    return new NextResponse(demoFrame, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="preview.png"'
      }
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export animation' },
      { status: 500 }
    );
  }
}