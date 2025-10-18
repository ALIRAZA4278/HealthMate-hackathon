import { GoogleGenerativeAI } from '@google/generative-ai';

// Hardcoded API key for testing
const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDc_Ag3fBcej5Yl7WQfRQzoCqqD3S96baA';

if (!process.env.GEMINI_API_KEY) {
  console.log('✅ Using hardcoded Gemini API key for testing');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const analyzeMedicalReport = async (fileBuffer, mimeType, fileType) => {
  if (!genAI) {
    throw new Error('Gemini API key not configured. Please add GEMINI_API_KEY to your .env file');
  }

  try {
    // Use Gemini 2.5 Flash (free, stable model with multimodal support)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are an expert medical report analyzer for HealthMate - a bilingual health companion app. Analyze this ${fileType} medical report thoroughly and provide comprehensive, accurate insights.

ANALYSIS REQUIREMENTS:

1. **English Summary** (3-4 detailed sentences):
   - Provide a comprehensive overview of the report findings
   - Mention the key tests performed and their significance
   - Highlight any concerning patterns or trends
   - Use clear, patient-friendly language

2. **Roman Urdu Summary** (3-4 detailed sentences):
   - Translate the EXACT same information in natural Roman Urdu
   - Use common Pakistani/Urdu terminology (e.g., "khoon ka test", "cholesterol", "diabetes")
   - Ensure it's easily understandable for Urdu speakers
   - Example style: "Aapki report mein kuch ahmiyat ki baatein samne aayi hain..."

3. **Abnormal Values** (Be VERY specific):
   - Format: "Test Name [Status]: Actual Value Unit (Normal: Normal Range)"
   - Example: "Total WBC Count High: 11.5 x10³/uL (Normal: 4.0-11.0)"
   - Example: "HDL Cholesterol Low: 42 mg/dL (Normal: >40)"
   - Include ALL values that are outside normal range
   - Specify if it's High (H) or Low (L)

4. **Questions for Doctor** (5-7 clinically relevant questions):
   - Base questions on ACTUAL findings in the report
   - Focus on interconnections between abnormal values
   - Ask about next steps, further tests, and treatment options
   - Include lifestyle modification questions
   - Be specific and actionable

5. **Food Recommendations**:
   **Foods to Avoid:**
   - List 8-10 specific foods/food groups based on findings
   - For cholesterol: mention fried foods, red meat, full-fat dairy, etc.
   - For diabetes: mention sugary drinks, white bread, desserts, etc.
   - For liver: mention alcohol, processed foods, excessive fats

   **Foods to Eat:**
   - List 8-10 specific beneficial foods
   - For cholesterol: oats, nuts, olive oil, fatty fish, fruits, vegetables
   - For diabetes: whole grains, leafy greens, legumes, berries
   - For liver: green tea, garlic, turmeric, leafy greens

6. **Home Remedies** (3-4 evidence-based remedies):
   - Provide culturally relevant remedies common in Pakistan/India
   - Include detailed preparation/usage instructions
   - Examples: Fenugreek seeds (Methi), Turmeric milk, Garlic, Cinnamon
   - Format: {"remedy": "Name (Local name)", "description": "Detailed 2-3 sentence description with dosage and method"}

QUALITY STANDARDS:
- Be medically accurate and evidence-based
- Use empathetic, reassuring tone while being honest
- ALWAYS specify units and normal ranges for abnormal values
- Roman Urdu should sound natural, not like awkward translation
- Food recommendations should be specific, not generic
- Home remedies should be SAFE and commonly known

IMPORTANT DISCLAIMER:
Include reminder that this analysis is for informational purposes only and not a substitute for professional medical advice.

Format your response as VALID JSON with this EXACT structure:
{
  "summaryEnglish": "Detailed 3-4 sentence summary...",
  "summaryUrdu": "Detailed 3-4 sentence Roman Urdu summary...",
  "abnormalValues": [
    "Test Name Status: Value Unit (Normal: Range)",
    "Another Test Status: Value Unit (Normal: Range)"
  ],
  "questionsToAsk": [
    {"question": "Specific question 1?"},
    {"question": "Specific question 2?"},
    {"question": "Specific question 3?"},
    {"question": "Specific question 4?"},
    {"question": "Specific question 5?"}
  ],
  "foodRecommendations": {
    "avoid": [
      "Specific food 1",
      "Specific food 2",
      "Specific food 3",
      "Specific food 4",
      "Specific food 5",
      "Specific food 6",
      "Specific food 7",
      "Specific food 8"
    ],
    "recommended": [
      "Specific food 1",
      "Specific food 2",
      "Specific food 3",
      "Specific food 4",
      "Specific food 5",
      "Specific food 6",
      "Specific food 7",
      "Specific food 8"
    ]
  },
  "homeRemedies": [
    {
      "remedy": "Remedy name (Local name)",
      "description": "Detailed preparation and usage instructions with dosage"
    },
    {
      "remedy": "Remedy name (Local name)",
      "description": "Detailed preparation and usage instructions with dosage"
    },
    {
      "remedy": "Remedy name (Local name)",
      "description": "Detailed preparation and usage instructions with dosage"
    }
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

    // Extract JSON from the response (Gemini might wrap it in markdown code blocks)
    const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/) || text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from Gemini response');
    }

    const jsonText = jsonMatch[1] || jsonMatch[0];
    const analysis = JSON.parse(jsonText);

    return analysis;
  } catch (error) {
    console.error('Error analyzing medical report:', error);
    throw new Error('Failed to analyze medical report: ' + error.message);
  }
};
