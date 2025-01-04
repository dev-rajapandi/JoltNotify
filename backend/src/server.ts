import ENV_VARIABLES from './config/envVariable';
import connectDB from './config/db';
import app from './app';

const { PORT } = ENV_VARIABLES;

// Connect to the database
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
