const express = require('express');

const PORT = 8081;

const app = express();
app.use(express.json());


app.post('/subscribe', (req, res) => {
    console.log(`Received subscribe request. [body=${JSON.stringify(req.body)}]`)

    res.status(201).send();
})

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});