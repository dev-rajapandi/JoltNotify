import mongoose from 'mongoose';
import ENV_VARIABLES from './envVariable';

const connectDB = async () => {
  try {
    await mongoose.connect(ENV_VARIABLES.MONGO_URI as string);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
