import File from '../models/File.model.js';
import AiInsight from '../models/AiInsight.model.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.utils.js';
import { analyzeMedicalReport } from '../utils/gemini.utils.js';

export const uploadReport = async (req, res) => {
  try {
    const { fileType, testDate, labHospital, doctor, price, notes } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    if (!testDate) {
      return res.status(400).json({ error: 'Test date is required' });
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(req.file.buffer, 'healthmate/reports');

    // Save file info to database
    const savedFile = await File.create({
      userId: req.user.userId,
      fileName: req.file.originalname,
      fileType: fileType || 'other',
      fileUrl: uploadResult.secure_url,
      testDate: new Date(testDate),
      labHospital: labHospital || '',
      doctor: doctor || '',
      price: price || '',
      notes: notes || '',
      cloudinaryPublicId: uploadResult.public_id,
    });

    // Analyze with Gemini AI
    const analysis = await analyzeMedicalReport(
      req.file.buffer,
      req.file.mimetype,
      fileType || 'medical report'
    );

    // Save AI insights
    const aiInsight = await AiInsight.create({
      fileId: savedFile._id,
      userId: req.user.userId,
      summaryEnglish: analysis.summaryEnglish,
      summaryUrdu: analysis.summaryUrdu,
      abnormalValues: analysis.abnormalValues,
      questionsToAsk: analysis.questionsToAsk,
      foodRecommendations: analysis.foodRecommendations,
      homeRemedies: analysis.homeRemedies,
    });

    res.status(201).json({
      message: 'Report uploaded and analyzed successfully',
      file: savedFile,
      analysis: aiInsight,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload and analyze report: ' + error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await File.find({ userId: req.user.userId }).sort({ testDate: -1 });

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

    res.json({ reports: reportsWithInsights });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await File.findOne({ _id: id, userId: req.user.userId });

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const insight = await AiInsight.findOne({ fileId: report._id });

    res.json({
      report: report.toObject(),
      insight: insight ? insight.toObject() : null,
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ error: 'Failed to fetch report' });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await File.findOne({ _id: id, userId: req.user.userId });

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(report.cloudinaryPublicId);

    // Delete AI insight
    await AiInsight.deleteOne({ fileId: report._id });

    // Delete file record
    await File.deleteOne({ _id: id });

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ error: 'Failed to delete report' });
  }
};
