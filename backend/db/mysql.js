const mysql = require('mysql2');

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'om780787',
    database: process.env.MYSQL_DATABASE || 'sih_users',
    waitForConnections: true,
    connectionLimit: 10,
  })
  .promise();

pool
  .query('SELECT 1')
  .then(() => console.log('Connected to MySQL successfully!'))
  .catch((err) => console.error('MySQL connection failed:', err.message));

module.exports = pool;
