import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import File from '@/models/File';
import AiInsight from '@/models/AiInsight';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware';

// GET all reports for logged-in user
export const GET = withAuth(async (req: AuthenticatedRequest) => {
  try {
    await dbConnect();

    const reports = await File.find({ userId: req.user?.userId })
      .sort({ testDate: -1 });

    // Get AI insights for each report
    const reportsWithInsights = await Promise.all(
      reports.map(async (report) => {
        const insight = await AiInsight.findOne({ fileId: report._id });
        return {
          ...report.toObject(),
          insight: insight ? insight.toObject() : null,
        };
      })
    );

    return NextResponse.json({ reports: reportsWithInsights });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
});
