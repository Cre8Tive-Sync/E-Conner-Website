import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fullName, email, department, subject, message } = body;

  if (!fullName || !email || !department || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }

  const submission = await prisma.contactSubmission.create({
    data: { fullName, email, department, subject, message },
  });

  return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
}
