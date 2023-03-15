const express = require('express');
const { Pool } = require('pg')
const config = require('./config.js');

const PORT = 8081;

const app = express();
app.use(express.json());

const pool = new Pool(config.db);

function emailHasBeenSubscribed(email){
  return false
}

function insertNewSubscriptionToDb(req){
    pool.query(`INSERT INTO subscription \
      (first_name, last_name, email)\
      VALUES\
      ("${req.firstName}","${req.lastName}","${req.email}")`,
      (err, res) =>{
          if (err){
            console.error(`Failed to insert subscription into database. [err=${err}]`);
            return false;
          }
          console.error(`Insertion successful`);
          return true;
      })
}

app.post('/subscribe', (req, res) => {
  console.log(`Received subscribe request. [body=${JSON.stringify(req.body)}]`)
    
  if (emailHasBeenSubscribed(req.email)){
    res.status(400).send('Email has been subscribed.')
    return
  }

  if(!insertNewSubscriptionToDb(req)){
    res.status(500).send();
    return;
  }

  res.status(201).send();
})

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});