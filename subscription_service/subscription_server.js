const express = require('express');
const { Pool } = require('pg')
const config = require('./config.js');

const PORT = 8081;

const HTTP_STATUS_CODE_DUPLICATE_EMAIL_SUBSCRIPTION = 460;

const app = express();
app.use(express.json());

const pool = new Pool(config.db);

function handleSubscriptionRequest(req, res){
    console.log(`Received subscription request. [body=${JSON.stringify(req.body)}]`)

    let countEmailQuery = `SELECT COUNT(*) AS count FROM subscription WHERE email = '${req.body.email}'`;
    
    let insertIntoSubscriptionTableStatement 
        = `INSERT INTO subscription \
        (first_name, last_name, email)\
        VALUES\
        ('${req.body.firstName}','${req.body.lastName}','${req.body.email}')`;

    pool.query(countEmailQuery, (err, result) => {
        if (err){
            console.error(`Failed to query email from database. [err=${err}]`);
            res.status(500).send();
        }else{
            if (result.rows[0].count > 0){
                res.status(HTTP_STATUS_CODE_DUPLICATE_EMAIL_SUBSCRIPTION).send();
            }else{
                pool.query(insertIntoSubscriptionTableStatement,
                    (err, result) =>{
                        if (err){
                            console.error(`Failed to insert subscription into database. [err=${err}]`);
                            res.status(500).send();
                        }else{
                            res.status(201).send();
                        }
                    }
                )
            }
        }
    })
}

app.post('/subscribe', (req, res) => handleSubscriptionRequest(req, res));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});