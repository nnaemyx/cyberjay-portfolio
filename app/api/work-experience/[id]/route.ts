import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import WorkExperience from '@/models/WorkExperience';

// GET single work experience
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const experience = await WorkExperience.findById(id);
    
    if (!experience) {
      return NextResponse.json({ success: false, error: 'Work experience not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch work experience' }, { status: 500 });
  }
}

// PUT update work experience
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const body = await request.json();
    const experience = await WorkExperience.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!experience) {
      return NextResponse.json({ success: false, error: 'Work experience not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: experience });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE work experience
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const experience = await WorkExperience.findByIdAndDelete(id);
    
    if (!experience) {
      return NextResponse.json({ success: false, error: 'Work experience not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete work experience' }, { status: 500 });
  }
}

