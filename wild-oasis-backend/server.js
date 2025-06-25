require('dotenv').config();
const mysql = require('mysql2/promise');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCPTION! Shutting down...');
  console.log(err.name, err.message);
  
  process.exit(1);
});

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});

async function shapeDatabase() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`CREATE TABLE IF NOT EXISTS settings (
      id int NOT NULL,
      created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      minBookingLength int DEFAULT NULL,
      maxBookingLength int DEFAULT NULL,
      maxGuestsPerBooking int DEFAULT NULL,
      breakfastPrice float DEFAULT NULL,
      PRIMARY KEY (id)
    );`);
    connection.release();
  } catch (error) {
    console.error('Error shaping database:', error);
    throw error;
  }
}

async function start() {
  try {
    await shapeDatabase();
    module.exports = pool;
    
    const app = require("./app");

    // Add your routes and middleware here
    // app.get('/', (req, res) => {
    //   res.send('Hello, world!');
    // });

    const server = app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });

    process.on('unhandledRejection', err => {
      console.log('UNHANDLED REJECTION! Shutting down...');
      console.log(err.name, err.message);
      
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (error) {
    console.error('Error starting application:', error);
  }
}

start();