import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'custodiauser',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'custodiadb',
  password: process.env.DB_PASSWORD || 'custodiapw',
  port: process.env.DB_PORT || 5432,
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
  }
};

export { pool };