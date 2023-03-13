const express = require('express');

const PORT = 8080;

const app = express();
app.use(express.json());


app.post('/subscribe', (req, res) => {
    console.log(`Received subscribe request. [body=${JSON.stringify(req.body)}]`)
    
    requiredKeys = ['firstName','lastName', 'email']
    for (requiredKey of requiredKeys){
        if (!(requiredKey in req.body)){
            res.status(400).send(`Missing required key ${requiredKey}.`);
            return;
        }
    }
    res.status(201).send();
})


app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});