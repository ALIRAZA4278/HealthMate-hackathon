import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import File from '@/models/File';
import AiInsight from '@/models/AiInsight';
import { withAuth, AuthenticatedRequest } from '@/lib/middleware';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { analyzemedicalReport } from '@/lib/gemini';

export const POST = withAuth(async (req: AuthenticatedRequest) => {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const fileType = formData.get('fileType') as string;
    const testDate = formData.get('testDate') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!testDate) {
      return NextResponse.json(
        { error: 'Test date is required' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(buffer, 'healthmate/reports');

    // Save file info to database
    const savedFile = await File.create({
      userId: req.user?.userId,
      fileName: file.name,
      fileType: fileType || 'other',
      fileUrl: uploadResult.secure_url,
      testDate: new Date(testDate),
      cloudinaryPublicId: uploadResult.public_id,
    });

    // Analyze with Gemini AI
    const analysis = await analyzemedicalReport(
      buffer,
      file.type,
      fileType || 'medical report'
    );

    // Save AI insights
    const aiInsight = await AiInsight.create({
      fileId: savedFile._id,
      userId: req.user?.userId,
      summaryEnglish: analysis.summaryEnglish,
      summaryUrdu: analysis.summaryUrdu,
      abnormalValues: analysis.abnormalValues,
      questionsToAsk: analysis.questionsToAsk,
      foodRecommendations: analysis.foodRecommendations,
      homeRemedies: analysis.homeRemedies,
    });

    return NextResponse.json(
      {
        message: 'Report uploaded and analyzed successfully',
        file: savedFile,
        analysis: aiInsight,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload and analyze report' },
      { status: 500 }
    );
  }
});
