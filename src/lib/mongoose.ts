import mongoose from 'mongoose';

// Track connection status
let isConnected = false; 

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Missing MongoDB URI. Please set MONGO_URI or MONGODB_URI in your environment variables.');
  }

  // If already connected, return early
  if (isConnected) {
    console.log('MongoDB connection already established');
    return;
  }

  try {
    console.log('Establishing new MongoDB connection...');
    await mongoose.connect(uri, {
      // Best practices for serverless environments
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    // Propagate the error so the caller knows it failed
    throw error;
  }
};

