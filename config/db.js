const mysql = require('mysql2');

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'gondola.proxy.rlwy.net',//'localhost',
  port: 47965,//3308,                // Your custom MySQL port
  user: 'root',              // Your MySQL username
  password: 'hiaXrCzDzGvWGaDMdAhPppLPqjYyQknR',              // Your MySQL password (empty if not set)
  database: 'investment_schemes', // Your DB name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Log for confirmation
pool.getConnection((err, connection) => {
  if (err) {    
    console.error('❌ DB connection failed11:', err.message);
  } else {
    console.log('✅ Connected to MySQL DB: srishtion2020');
    connection.release();
  }
});

module.exports = pool.promise();
