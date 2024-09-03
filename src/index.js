
  import express from 'express';
  import userRoutes from './routes/userRoutes.js';
  import { connectDB } from './config/db.js';
  import dotenv from 'dotenv';

  console.log('Configuring dotenv...');
  dotenv.config();

  console.log('Creating Express app...');
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  console.log('Connecting to database...');
  // Connect to the database
  connectDB().catch(err => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  });

  console.log('Setting up routes...');
  // Routes
  app.use('/api/users', userRoutes);

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
  });

  console.log('Starting server...');
  app.listen(PORT, () => {
    console.log(`User microservice running on port ${PORT}`);
  });
