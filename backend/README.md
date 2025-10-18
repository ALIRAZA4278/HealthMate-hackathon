# HealthMate Backend - Node.js API

Backend API for HealthMate - Sehat ka Smart Dost

## Overview

This is the Node.js/Express backend for HealthMate, providing REST APIs for user authentication, medical report management, AI analysis, and vitals tracking.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **AI**: Google Gemini 1.5 Flash/Pro
- **File Storage**: Cloudinary
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── report.controller.js  # Report upload & management
│   │   └── vitals.controller.js  # Vitals tracking
│   ├── middleware/
│   │   ├── auth.middleware.js    # JWT authentication
│   │   └── upload.middleware.js  # Multer file upload
│   ├── models/
│   │   ├── User.model.js
│   │   ├── File.model.js
│   │   ├── AiInsight.model.js
│   │   └── Vitals.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── report.routes.js
│   │   └── vitals.routes.js
│   ├── utils/
│   │   ├── auth.utils.js         # JWT & password utilities
│   │   ├── cloudinary.utils.js   # File upload utilities
│   │   └── gemini.utils.js       # AI analysis utilities
│   └── server.js                 # Express app entry point
├── .env.example
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (MongoDB Atlas recommended)
- Google Gemini API key
- Cloudinary account

### Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Fill in your environment variables in `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
```

5. Run the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Production

```bash
npm start
```

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Reports (All require Authentication)

#### Upload Report
```
POST /api/reports/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

Body (form-data):
- file: (file) - PDF or image file
- fileType: (text) - "lab_report" | "prescription" | "x-ray" | "ultrasound" | "other"
- testDate: (text) - "2025-01-15"

Response:
{
  "message": "Report uploaded and analyzed successfully",
  "file": { ... },
  "analysis": {
    "summaryEnglish": "...",
    "summaryUrdu": "...",
    "abnormalValues": [...],
    "questionsToAsk": [...],
    "foodRecommendations": { ... },
    "homeRemedies": [...]
  }
}
```

#### Get All Reports
```
GET /api/reports
Authorization: Bearer {token}

Response:
{
  "reports": [
    {
      "_id": "...",
      "fileName": "...",
      "fileUrl": "...",
      "testDate": "...",
      "insight": { ... }
    }
  ]
}
```

#### Get Single Report
```
GET /api/reports/:id
Authorization: Bearer {token}

Response:
{
  "report": { ... },
  "insight": { ... }
}
```

#### Delete Report
```
DELETE /api/reports/:id
Authorization: Bearer {token}

Response:
{
  "message": "Report deleted successfully"
}
```

### Vitals (All require Authentication)

#### Get All Vitals
```
GET /api/vitals
Authorization: Bearer {token}

Response:
{
  "vitals": [
    {
      "_id": "...",
      "date": "2025-01-15",
      "bloodPressure": { "systolic": 120, "diastolic": 80 },
      "bloodSugar": 95,
      "weight": 70,
      "notes": "Feeling good"
    }
  ]
}
```

#### Add Vitals
```
POST /api/vitals
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "date": "2025-01-15",
  "bloodPressure": { "systolic": 120, "diastolic": 80 },
  "bloodSugar": 95,
  "weight": 70,
  "heartRate": 72,
  "temperature": 98.6,
  "notes": "Feeling good"
}

Response:
{
  "message": "Vitals added successfully",
  "vitals": { ... }
}
```

#### Update Vitals
```
PUT /api/vitals/:id
Authorization: Bearer {token}
Content-Type: application/json

Body: (any vitals fields to update)
{
  "bloodSugar": 100,
  "notes": "Updated notes"
}

Response:
{
  "message": "Vitals updated successfully",
  "vitals": { ... }
}
```

#### Delete Vitals
```
DELETE /api/vitals/:id
Authorization: Bearer {token}

Response:
{
  "message": "Vitals deleted successfully"
}
```

### Health Check
```
GET /health

Response:
{
  "status": "OK",
  "message": "HealthMate API is running"
}
```

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Error Handling

All errors return a JSON response with an error message:

```json
{
  "error": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## File Upload

- Accepted formats: JPEG, PNG, WebP, PDF
- Maximum file size: 10MB
- Files are uploaded to Cloudinary
- Secure signed URLs are generated

## AI Analysis

- Uses Google Gemini 1.5 Flash for fast analysis
- Supports PDF and image formats
- Provides bilingual summaries (English + Roman Urdu)
- Highlights abnormal values
- Suggests doctor questions
- Recommends foods and home remedies

## Security

- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens expire in 7 days
- CORS enabled for frontend URL
- File type validation
- File size limits
- Authentication middleware for protected routes

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development/production |
| MONGODB_URI | MongoDB connection string | mongodb+srv://... |
| JWT_SECRET | Secret key for JWT | your-secret-key |
| GEMINI_API_KEY | Google Gemini API key | AIza... |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | your-cloud-name |
| CLOUDINARY_API_KEY | Cloudinary API key | 123456789 |
| CLOUDINARY_API_SECRET | Cloudinary API secret | your-secret |
| FRONTEND_URL | Frontend URL for CORS | http://localhost:3000 |

## Deployment

### Render / Railway / Heroku

1. Create a new web service
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### PM2 (Production)

```bash
npm install -g pm2
pm2 start src/server.js --name healthmate-api
pm2 save
pm2 startup
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode (with nodemon)
npm run dev

# Run in production mode
npm start
```

## Testing with curl

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get reports (replace TOKEN)
curl http://localhost:5000/api/reports \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## License

MIT

---

**Built with ❤️ for SMIt students**
