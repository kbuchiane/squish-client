var express = require("express");
var path = require("path");

var app = new express();

app.get('/', function(request, response) {
   response.sendFile(path.join(__dirname, '/../..', 'index.html'));
}).listen(8081);

// Console will print the message
console.log('Client running at http://127.0.0.1:8081/');