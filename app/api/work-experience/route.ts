import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import WorkExperience from '@/models/WorkExperience';

// GET all work experiences
export async function GET() {
  try {
    await dbConnect();
    const experiences = await WorkExperience.find({}).sort({ startDate: -1, order: 1 });
    return NextResponse.json({ success: true, data: experiences });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch work experiences' }, { status: 500 });
  }
}

// POST create new work experience
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const experience = await WorkExperience.create(body);
    
    return NextResponse.json({ success: true, data: experience }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

