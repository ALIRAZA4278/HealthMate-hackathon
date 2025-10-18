# HealthMate – Sehat ka Smart Dost

**Your AI-Powered Personal Health Companion**

A bilingual (English + Roman Urdu) health management application that helps users upload, store, and understand their medical reports using Google Gemini AI.

## Overview

HealthMate solves a real-world problem: managing medical reports and understanding them in simple language. Every family has someone who needs regular tests. Managing all those files, reports, and follow-ups becomes very hard. When the doctor asks, "Pichlay reports laao," we start digging through WhatsApp or old folders.

**HealthMate** is the solution!

## Features

- Upload all test reports & prescriptions
- Gemini AI reads and explains reports (no manual OCR needed)
- Get summaries in English + Roman Urdu
- View your entire medical timeline in one place
- Manually add vitals (BP, Sugar, Weight, etc.) without lab reports
- Highlights abnormal values
- Get questions to ask your doctor
- Food recommendations and home remedies

## Architecture

This project consists of:
1. **Backend** - Node.js/Express API (in `backend/` folder)
2. **Frontend** - Next.js 15 application (root folder)

## Tech Stack

**Backend**:
- Node.js + Express.js
- MongoDB + Mongoose
- Google Gemini 1.5 AI
- Cloudinary (file storage)
- JWT authentication

**Frontend**:
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## Quick Start

### 1. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2. Setup Frontend

```bash
# In root directory
npm install
# Create .env.local if needed
npm run dev
```

Frontend runs on: `http://localhost:3000`

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Documentation

- [Backend API Documentation](backend/README.md)
- Full project details in this README

## API Endpoints

- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `POST /api/reports/upload` - Upload report
- `GET /api/reports` - Get all reports
- `POST /api/vitals` - Add vitals
- `GET /api/vitals` - Get vitals

See [backend/README.md](backend/README.md) for complete API documentation.

## Disclaimer

**IMPORTANT**: This application is for informational purposes only. The AI analysis helps you understand reports, not replace professional medical consultation.

**Roman Urdu**: Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi. Hamesha apne doctor se consult karein.

## Deployment

### Backend
Deploy to Render, Railway, or Heroku

### Frontend
```bash
npm run build
vercel deploy
```

## Future Enhancements

- Medication reminders
- Doctor appointment scheduling
- Family member profiles
- WhatsApp integration
- Multi-language support

## License

MIT License

---

**Built with ❤️ for SMIt students**

"Yeh sirf ek project nahi, ek real-life problem ka digital solution hai."
