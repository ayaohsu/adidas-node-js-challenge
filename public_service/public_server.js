const express = require('express');
const axios = require('axios');

const PORT = 8080;

const app = express();
app.use(express.json());


app.post('/subscribe', (req, res) => {
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
            if (response.status != 201){
                console.error(`Received error response from subscription service. [statusCode=${response.status}]`)
                res.status(500).send()
            }else{
                res.status(201).send();
            }
        })
        .catch(error => {
            console.log(`Failed to send subscription request to subscription service. [error=${error}]`);
        })
});


app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});