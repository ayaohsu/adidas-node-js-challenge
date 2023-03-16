const express = require('express');
const { Pool } = require('pg')
const config = require('./config.js');

const PORT = 8081;

const HTTP_STATUS_CODE_DUPLICATE_EMAIL_SUBSCRIPTION = 460;

const app = express();
app.use(express.json());

const pool = new Pool(config.db);

app.post('/subscribe', (req, res) => {
    console.log(`Received subscribe request. [body=${JSON.stringify(req.body)}]`)

    let emailQuery = `SELECT COUNT(*) AS count FROM subscription WHERE email = '${req.body.email}'`;
    
    let insertIntoSubscriptionTableStatement = 
        `INSERT INTO subscription \
        (first_name, last_name, email)\
        VALUES\
        ('${req.body.firstName}','${req.body.lastName}','${req.body.email}')`;

    pool.query(emailQuery, (err, result) => {
        if (err){
            console.error(`Failed to query email from database. [err=${err}]`);
            res.status(500).send();
        }else{
            if (result.rows[0].count > 0){
                res.status(HTTP_STATUS_CODE_DUPLICATE_EMAIL_SUBSCRIPTION).send('Email has been subscribed.');
                return;
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
})

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});