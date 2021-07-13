const mysql = require('mysql');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test'
});

conn.connect((err) => {
  if (err) {
    console.error('Error connecting mysql: ', err);
  }
  console.log('connected');
});

conn.end(() => {
  console.log('disconnected');
});