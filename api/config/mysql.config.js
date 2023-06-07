import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'admin',
  password: 'letmein',
  database: 'maindb',
  connectionLimit: '20'
});

export default pool;