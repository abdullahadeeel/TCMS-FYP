const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const resetAdmin = async () => {
  const password = 'admin';
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  
  try {
    await pool.query('DELETE FROM users WHERE username = $1', ['admin']);
    await pool.query(
      'INSERT INTO users (username, password_hash, full_name, role) VALUES ($1, $2, $3, $4)',
      ['admin', hash, 'Administrator', 'admin']
    );
    console.log('Admin user reset successfully with password: "admin"');
    console.log('New hash:', hash);
  } catch (err) {
    console.error('Error resetting admin:', err);
  } finally {
    await pool.end();
  }
};

resetAdmin();
