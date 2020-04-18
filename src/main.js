import express from 'express';

var app = new express();
var port = 8081;

var clientPath = process.env.tcClientPath;

app.get('/', function(request, response) {
   response.sendFile(clientPath + '/index.html');
}).listen(port);

// Console will print the message
console.log('Client running at http://127.0.0.1:' + port + '/');