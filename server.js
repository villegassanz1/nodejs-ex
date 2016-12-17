var express = require('express');  
var app = express();  
var server = require('http').Server(app);
//var mongoose = require('mongoose');
//mongoose.connect('mongodb: //localhost/test');  
/*
var developer = [
	{first: 'Alice', last: 'Wonderland'},
	{first: 'Bob', last: 'Marley'}
];
*/
app.use(express.static('public'));

app.get('/', function(request,response){
  response.sendFile(__dirname + '/index.html');
});
//var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//app.listen(port, ip);

server.listen(8080, function() {  
  console.log("Servidor corriendo en http://localhost:8080");
});
