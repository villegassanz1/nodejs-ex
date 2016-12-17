var express = require('express');  
var app = express();  
var server = require('http').Server(app);  

app.use(express.static(__dirname + '/public'));

var developer = [
	{first: 'Alice', last: 'Wonderland'},
	{first: 'Bob', last: 'Marley'}
];
/*
app.get('/', function(request,response){
  response.sendFile(__dirname + '/index.html');
});
*/

app.get('/', function(request,response){
  response.json(developer);
});

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port,ip);