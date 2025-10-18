# How to Start Both Servers

## Quick Start (Open 2 Terminals)

### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
Backend will run on: **http://localhost:5000**

### Terminal 2 - Frontend Server
```bash
npm run dev
```
Frontend will run on: **http://localhost:3000**

---

## Before Starting - Set Environment Variables

### 1. Backend Environment (.env)
Create `backend/.env` file:

```bash
cd backend
cp .env.example .env
```

Then edit `backend/.env` with your API keys:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
```

### 2. Frontend Environment (.env.local)
Create `.env.local` in root folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Verification

1. **Backend Health Check:**
   ```bash
   curl http://localhost:5000/health
   ```
   Should return: `{"status":"OK","message":"HealthMate API is running"}`

2. **Frontend:**
   Open browser: http://localhost:3000

---

## Common Issues

### Port already in use:
```bash
# Kill process on port 5000 (Backend)
npx kill-port 5000

# Kill process on port 3000 (Frontend)
npx kill-port 3000
```

### MongoDB connection error:
- Check your MONGODB_URI is correct
- Whitelist your IP in MongoDB Atlas (0.0.0.0/0 for testing)

---

## Development Tips

- Backend auto-restarts on file changes (nodemon)
- Frontend auto-reloads on file changes (Next.js)
- Check console for errors
- Backend logs show in Terminal 1
- Frontend logs show in Terminal 2

---

**Happy Coding! 🚀**
