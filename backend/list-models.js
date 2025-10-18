import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDc_Ag3fBcej5Yl7WQfRQzoCqqD3S96baA';
const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
  try {
    console.log('🔍 Fetching available Gemini models...\n');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );

    const data = await response.json();

    if (data.models) {
      console.log('✅ Available models:\n');
      data.models.forEach(model => {
        console.log(`📌 ${model.name}`);
        console.log(`   Display Name: ${model.displayName}`);
        console.log(`   Description: ${model.description}`);
        console.log(`   Supported Methods: ${model.supportedGenerationMethods?.join(', ')}`);
        console.log('');
      });
    } else {
      console.log('❌ No models found or error:', data);
    }
  } catch (error) {
    console.error('❌ Error listing models:', error.message);
  }
}

listModels();
