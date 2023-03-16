const express = require('express');
const axios = require('axios');

const PORT = 8080;

const HTTP_STATUS_CODE_DUPLICATE_EMAIL_SUBSCRIPTION = 460;

const app = express();
app.use(express.json());


function handleSubscribeRequest(req, res){
    console.log(`Received subscribe request. [body=${JSON.stringify(req.body)}]`)
    
    requiredKeys = ['firstName','lastName', 'email']
    for (requiredKey of requiredKeys){
        if (!(requiredKey in req.body)){
            res.statusMessage = `Missing required key ${requiredKey}.`;
            res.status(400).send();
            return;
        }
    }

    requestBodyToSubscriptionService = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };

    axios.post('http://subscription_service:8081/subscribe', requestBodyToSubscriptionService)
    .then(response => {
        res.status(201).send();
    })
    .catch(error => {
        if (error.response.status == HTTP_STATUS_CODE_DUPLICATE_EMAIL_SUBSCRIPTION){
            console.info(`Received subscription request that has duplicate email. [email=${req.body.email}]`)
            res.status(400).send('Email has been subscribed.');
        }else{
            console.error(`Failed to create new subscription from subscription service. [statusCode=${error}]`)
            res.status(500).send();
        }
    })
}

app.post('/subscribe', (req, res) => handleSubscribeRequest(req, res));


app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

module.exports = handleSubscribeRequest;