const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const connectionKey = mysql.createConnection ({
  db_host : process.env.DB_HOST,
  db_name : process.env.DB_NAME,
  db_user : process.env.DB_USER,
  password : process.env.DB_PASSWORD
});

connectionKey.connect((err)=>{
  console.log("Failed to connect database. Error: "+err);
})
app.get('/',(req,res)=>{
  console.log("Request received");
  res.end("Hello World");
}).listen(8080,(err)=>{
  if(err) {
    console.log("Failed to start server. Error: ");
    throw err;
  }
  console.log("Server is Listening...");
});
