var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    poll = require('./modules');
const CONFIG = require('./config').events;
var Arr = [];

//two subjects with and against
Arr.push(new poll({
    topic: `with`,
    votes: 0
}));

Arr.push(new poll({
    topic: `against`,
    votes: 0
}));


//do what ever you want
Arr[0].increment();
Arr[0].increment();
Arr[0].getAll();
Arr[0].reset();
Arr[0].increment();
Arr[0].increment();
Arr[0].getAll();
Arr[0].increment();
Arr[0].getAll();
for (let index = 0; index < 8; index++)
    Arr[0].increment();
Arr[0].getAll();
Arr[0].increment();


Arr[1].increment();
Arr[1].getAll();
Arr[1].reset();
Arr[1].increment();
Arr[1].getAll();


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