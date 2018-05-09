var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    topic = require('./modules/index');
const CONFIG = require('./config').events;
var Arr = [];

for (let i = 0; i < 20; i++)
    Arr.push(topic({
        topic: `Topic # ${i}`,
        votes: 0
    })); //genrtaing topics 

app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
    ${LOG}
    </body>
    </html>`);
});

app.listen(port);
console.log(`listening on port ${port}`);