import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Vitals from '@/models/Vitals';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware';

// GET all vitals for logged-in user
export const GET = withAuth(async (req: AuthenticatedRequest) => {
  try {
    await dbConnect();

    const vitals = await Vitals.find({ userId: req.user?.userId })
      .sort({ date: -1 })
      .limit(50);

    return NextResponse.json({ vitals });
  } catch (error) {
    console.error('Error fetching vitals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vitals' },
      { status: 500 }
    );
  }
});

// POST - Add new vitals entry
export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    await dbConnect();

    const data = await req.json();
    const { date, bloodPressure, bloodSugar, weight, heartRate, temperature, notes } = data;

    if (!date) {
      return NextResponse.json(
        { error: 'Date is required' },
        { status: 400 }
      );
    }

    const vitals = await Vitals.create({
      userId: req.user?.userId,
      date: new Date(date),
      bloodPressure,
      bloodSugar,
      weight,
      heartRate,
      temperature,
      notes,
    });

    return NextResponse.json(
      {
        message: 'Vitals added successfully',
        vitals,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding vitals:', error);
    return NextResponse.json(
      { error: 'Failed to add vitals' },
      { status: 500 }
    );
  }
});
