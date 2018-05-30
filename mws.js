var http = require('http');
var express = require('express');
var app = express();
var httpServer = http.createServer(app);

app.post('/mws', function (req, res) {
console.log('I am working');
});

app.listen(3000);
