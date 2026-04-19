const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const app = express();


//Database connection processes.
const dbConnector = mysql.createConnection ({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  port : process.env.DB_PORT
});
dbConnector.connect((err)=>{
  if(err){
    console.log("Failed to connect database. Error: "+err);
    return;
  }
  console.log("Database connection successful.");

  //database creation process
  const queryCreateDB = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;
  dbConnector.query(queryCreateDB, (err,result)=>{
  if(err){ 
    console.log("Failed to create Db. Error:" + err);
  return;
  }
  console.log(`Database ${process.env.DB_NAME} created`);
  });
  //using the database
  dbConnector.query(`USE ${process.env.DB_NAME}`, (err,result)=>{
    if(err){console.log("Failed to use Db. Error:" + err);}
    else{console.log(`Using database ${process.env.DB_NAME}`);}
  });

  //table creation process
  const queryCreateTable = `CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL UNIQUE,
    product_description TEXT
    );`;
    dbConnector.query(queryCreateTable, (err,result)=>{
      if(err){throw err;}
      console.log("Table created successfully.");

      //insert data
      const queryInsertData = `INSERT INTO products (product_name, product_description) VALUES ('pn_iphone', 'iPhone description')`;
      dbConnector.query(queryInsertData, (err,result)=>{
        if(err){throw err;} 
        console.log("Data inserted successfully.");
      });
    });

});


//Request handling processes.
app.use(cors());
app.get('/',(req,res)=>{
  console.log("Request received");
  res.end("Hello World");
});
app.listen(8080,(err)=>{
  if(err) {
    console.log("Failed to start server. Error: ");
    throw err;
  }
  console.log("Server is Listening...");
});
app.get('/api/products', (req,res)=>{
  const querySelect = `SELECT * FROM products`;
  dbConnector.query(querySelect, (err,result)=>{
      if(err) throw err;
      return res.json(result);
  })
});
