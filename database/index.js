const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',       // Use 'mysql' if running inside a Docker network
  user: 'user',           // Same as in docker-compose.yml
  password: 'password',   // Same as in docker-compose.yml
  database: 'test_db',    // Same as in docker-compose.yml
  port: 3306,             // MySQL default port
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise(); // Using Promises for async/await queries
