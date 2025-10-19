import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Please define the GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function analyzemedicalReport(fileBuffer, mimeType, fileType) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a medical report analyzer. Analyze this ${fileType} medical report and provide:

1. A clear summary in English (2-3 sentences)
2. The same summary in Roman Urdu (2-3 sentences)
3. List any abnormal values found (e.g., "WBC High: 12000", "Hemoglobin Low: 9.5")
4. Provide 3-5 important questions the patient should ask their doctor
5. Food recommendations:
   - Foods to avoid based on the findings
   - Foods that may be beneficial
6. Safe home remedies that may help (2-3 remedies with descriptions)

Important:
- Be clear and simple in your language
- Highlight any concerning values
- Roman Urdu should be easy to understand (e.g., "Aapki report mein kuch values normal range se bahar hain")
- Only suggest safe, general home remedies
- Remind that this is for information only, not medical advice

Format your response as JSON with this structure:
{
  "summaryEnglish": "...",
  "summaryUrdu": "...",
  "abnormalValues": ["...", "..."],
  "questionsToAsk": [{"question": "..."}, {"question": "..."}],
  "foodRecommendations": {
    "avoid": ["...", "..."],
    "recommended": ["...", "..."]
  },
  "homeRemedies": [
    {"remedy": "...", "description": "..."},
    {"remedy": "...", "description": "..."}
  ]
}`;

    const imagePart = {
      inlineData: {
        data: fileBuffer.toString('base64'),
        mimeType: mimeType,
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from Gemini response');
    }

    const jsonText = jsonMatch[1] || jsonMatch[0];
    const analysis = JSON.parse(jsonText);

    return analysis;
  } catch (error) {
    console.error('Error analyzing medical report:', error);
    throw new Error('Failed to analyze medical report');
  }
}

export async function analyzeMedicalReportFromUrl(fileUrl, fileType) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a medical report analyzer. Analyze this ${fileType} medical report and provide:

1. A clear summary in English (2-3 sentences)
2. The same summary in Roman Urdu (2-3 sentences)
3. List any abnormal values found (e.g., "WBC High: 12000", "Hemoglobin Low: 9.5")
4. Provide 3-5 important questions the patient should ask their doctor
5. Food recommendations:
   - Foods to avoid based on the findings
   - Foods that may be beneficial
6. Safe home remedies that may help (2-3 remedies with descriptions)

Important:
- Be clear and simple in your language
- Highlight any concerning values
- Roman Urdu should be easy to understand (e.g., "Aapki report mein kuch values normal range se bahar hain")
- Only suggest safe, general home remedies
- Remind that this is for information only, not medical advice

Format your response as JSON with this structure:
{
  "summaryEnglish": "...",
  "summaryUrdu": "...",
  "abnormalValues": ["...", "..."],
  "questionsToAsk": [{"question": "..."}, {"question": "..."}],
  "foodRecommendations": {
    "avoid": ["...", "..."],
    "recommended": ["...", "..."]
  },
  "homeRemedies": [
    {"remedy": "...", "description": "..."},
    {"remedy": "...", "description": "..."}
  ]
}`;

    const result = await model.generateContent([
      prompt,
      {
        fileData: {
          fileUri: fileUrl,
          mimeType: 'application/pdf',
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from Gemini response');
    }

    const jsonText = jsonMatch[1] || jsonMatch[0];
    const analysis = JSON.parse(jsonText);

    return analysis;
  } catch (error) {
    console.error('Error analyzing medical report:', error);
    throw new Error('Failed to analyze medical report');
  }
}
