import mongoose from 'mongoose';

// Hardcoded MongoDB URI for testing
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://aliraza:smit-hackathon-xyz@cluster0.wlgo6o6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

if (!process.env.MONGODB_URI) {
  console.log('✅ Using hardcoded MongoDB URI for testing');
}

const connectDB = async () => {
  try {
    console.log('🔄 Attempting MongoDB connection...');
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    console.warn('⚠️  Server will continue running without database. Add your IP to MongoDB Atlas whitelist.');
    console.warn('📍 Go to: https://cloud.mongodb.com/ → Network Access → Add IP Address → Allow from Anywhere');
    // Don't exit, let server continue
  }
};

export default connectDB;
