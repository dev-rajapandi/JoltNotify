import dotenv from 'dotenv';

dotenv.config();

const ENV_VARIABLES = {
  PORT: parseInt(process.env.PORT || '5000', 10), // Converts to number safely
  MONGO_URI: process.env.MONGO_URI,
};

if (!ENV_VARIABLES.MONGO_URI) {
  throw new Error('MONGO_URI is missing in environment variables');
}

export default ENV_VARIABLES;
