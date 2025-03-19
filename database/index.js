// Import the MySQL module
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',       // Your MySQL server (use IP if remote)
  user: 'root',            // Your MySQL username
  password: 'yourpassword', // Your MySQL password
  database: 'mydatabase'    // The name of the database
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Example query
connection.query('SELECT * FROM users', (err, results) => {
  if (err) throw err;
  console.log('Data received:', results);
});

// Close the connection when done
connection.end();
