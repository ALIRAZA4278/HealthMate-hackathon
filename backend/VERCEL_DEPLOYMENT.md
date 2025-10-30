# HealthMate Backend - Vercel Deployment Guide

## Environment Variables

Vercel par deploy karne se pehle, ye environment variables set karne honge:

### Required Environment Variables:

```
MONGODB_URI=mongodb+srv://aliraza:smit-hackathon-xyz@cluster0.wlgo6o6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
GEMINI_API_KEY=AIzaSyDc_Ag3fBcej5Yl7WQfRQzoCqqD3S96baA
CLOUDINARY_CLOUD_NAME=dxakeehl2
CLOUDINARY_API_KEY=487114851951122
CLOUDINARY_API_SECRET=a-pk5YDYGiVDux0yNH6jHNGRqDA
JWT_SECRET=your-secret-key-change-this
FRONTEND_URL=https://health-mate-hackathon.vercel.app
NODE_ENV=production
```

## Deployment Steps

### Method 1: Vercel CLI se Deploy

1. **Vercel CLI install karein:**
   ```bash
   npm install -g vercel
   ```

2. **Backend directory mein jaye:**
   ```bash
   cd backend
   ```

3. **Vercel login karein:**
   ```bash
   vercel login
   ```

4. **Deploy karein:**
   ```bash
   vercel --prod
   ```

5. **Environment variables set karein:**
   ```bash
   vercel env add MONGODB_URI
   vercel env add GEMINI_API_KEY
   vercel env add CLOUDINARY_CLOUD_NAME
   vercel env add CLOUDINARY_API_KEY
   vercel env add CLOUDINARY_API_SECRET
   vercel env add JWT_SECRET
   vercel env add FRONTEND_URL
   vercel env add NODE_ENV
   ```

### Method 2: Vercel Dashboard se Deploy

1. **Vercel Dashboard open karein:** https://vercel.com/dashboard

2. **"Add New Project" par click karein**

3. **GitHub repository select karein:**
   - Repository: `ALIRAZA4278/health-mate`
   - Root Directory: `backend` (set this in settings)

4. **Environment Variables add karein:**
   - Settings → Environment Variables
   - Upar diye gaye sare variables add karein

5. **Deploy button click karein**

## Important Notes

### CORS Configuration
- Frontend URL: `https://health-mate-hackathon.vercel.app`
- Backend automatically frontend ko allow karega

### MongoDB Atlas Configuration
- MongoDB Atlas mein jaye: https://cloud.mongodb.com/
- Network Access → Add IP Address
- "Allow from Anywhere" (0.0.0.0/0) select karein
- Ye zaruri hai kyunke Vercel serverless functions different IPs se connect karte hain

### Testing Deployment
Deployment ke baad test karein:

```bash
curl https://health-mate-hackathon-backend.vercel.app/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "HealthMate API is running"
}
```

## API Endpoints

- Health Check: `GET /health`
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Reports: `GET /api/reports`, `POST /api/reports`
- Vitals: `GET /api/vitals`, `POST /api/vitals`
- Family Members: `GET /api/family-members`, `POST /api/family-members`

## Troubleshooting

### Issue: MongoDB Connection Failed
**Solution:**
- MongoDB Atlas mein IP whitelist check karein
- Connection string verify karein
- Environment variable MONGODB_URI sahi set hai check karein

### Issue: Gemini API Not Working
**Solution:**
- GEMINI_API_KEY verify karein
- API quota check karein
- API key active hai check karein

### Issue: File Upload Failed
**Solution:**
- Cloudinary credentials verify karein
- Cloudinary account active hai check karein
- CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET sahi hain check karein

### Issue: CORS Error
**Solution:**
- FRONTEND_URL sahi set hai check karein
- Frontend domain exact match kare (with https://)
- Trailing slash na ho

## Security Recommendations

1. **JWT_SECRET change karein:**
   - Strong random string use karein
   - Example: `openssl rand -base64 32`

2. **Environment variables secure rakhe:**
   - Git mein commit na karein
   - Vercel dashboard mein encrypted hain

3. **MongoDB credentials:**
   - Production mein separate user banayein
   - Minimal permissions de

## Support

Issues ke liye:
- GitHub: https://github.com/ALIRAZA4278/health-mate/issues
- Backend Domain: https://health-mate-hackathon-backend.vercel.app/
- Frontend Domain: https://health-mate-hackathon.vercel.app/
