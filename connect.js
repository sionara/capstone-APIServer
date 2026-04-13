//import mysql for db
const mysql = require("mysql");
//global variables
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  port: process.env.DB_PORT,
  database: process.env.DB,
  ssl: {
    rejectUnauthorized: false  // required for Aiven
  }
});

//check db connection
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Successfully connected with Database...");
  }
});

module.exports = db;
