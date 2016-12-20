var app = require('express')();  
//var app = express();  
//var http = require('http').Server(app);
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;



//var mongoose = require('mongoose');
//var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 

mongoose.connect('mongodb://villegas:12345@172.30.202.200:27017/buslocation');  

var beacons =
[
{
	mac: '[E6:20:24:20:0A:B2]',
	estado: 0,
	ruta: 'Tule Oaxaca',
	idSocket: ''
},
{
	mac: '[D3:40:0D:7B:0B:18]',
	estado: 0,
	ruta: 'Tec Oaxaca',
	idSocket: ''
},
{
	mac: '[F2:57:6B:A5:09:DB]',
	estado: 0,
	ruta: 'DIF Oaxaca',
	idSocket: ''
}
];


io.on('connection', function(socket) {
	console.log('El usuario: ' + socket.id + ' se ha conectado.');
	socket.on('enviarCoordenadas', function(mensaje) {
		var datos = mensaje.split(',');
		console.log(socket.id + ': ' + datos[2] + ', ' + datos[3]);
		for(var i = 0; i < beacons.length; i++) {
			if(datos[5] === beacons[i].mac && beacons[i].idSocket === '') {
				beacons[i].idSocket = socket.id;
			}
			if(beacons[i].idSocket === socket.id && datos[5] === beacons[i].mac) {
				socket.broadcast.emit('recibirCoordenadas', {
					idUser: datos[0],
					userName: datos[1],
					tipoUsuario: datos[2],
					idSocket: socket.id,
					latitud: datos[3],
					longitud: datos[4],
					ruta: beacons[i].ruta
				});
			}
		}
	});
	socket.on('bluetoothApagado', function() {
		for(var i = 0; i < beacons.length; i++) {
			if(beacons[i].idSocket === socket.id) {
				beacons[i].idSocket = '';
			}
		}
		socket.broadcast.emit('bluetoothApagadoAndroid', {
			idSocket: socket.id
		});
	});
	socket.on('disconnect', function() {
		console.log('El usuario: ' + socket.id + ' se ha desconectado.');
		for(var i = 0; i < beacons.length; i++) {
			if(beacons[i].idSocket === socket.id) {
				beacons[i].idSocket = '';
			}
		}
		socket.broadcast.emit('eliminarCoordenadas', {
			idSocket: socket.id
		});
	});
});

	var AutorSchema = new mongoose.Schema({  
    		nombre: String,
    		biografia: String,
    		fecha_de_nacimiento: Date,
    		nacionalidad: String
	}, {collection : "autor"});

	var AutorModel = mongoose.model('autor', AutorSchema);

	var LibroSchema = new mongoose.Schema({  
   		titulo: String,
    		paginas: Number,
    		isbn: String,
    		autor: { type: Schema.ObjectId, ref: "autor" } 
	}, , {collection : "libro"});

	var LibroModel = mongoose.model('libro', LibroSchema);

	app.get('/api/author', function(req, res){
	var obj_autor = new AutorModel({nombre: req.query.nombre, biografia: req.query.biografia});
	obj_autor.save(function(err,doc){
			res.json(doc);	
		});
	});

	app.get('/api/authors',function(req, res){
	AutorModel.find(function(err, sites){
			res.json(sites);
		});
	});

	app.get('/api/book', function(req, res){
	var book1 = new LibroModel({nombre: req.query.titulo, paginas: req.query.paginas, autor: req.query.id_autor });
	book1.save(function(err,doc){
			res.json(doc);	
		});
	});

	app.get('/api/books',function(req, res){
	LibroModel.find(function(err, sites){
			res.json(sites);
		});
	});

	
/*
	var UsuarioSchema = new mongoose.Schema({
		_id: String,
		nombre : String,
		tipo_cuenta : String,
		created : {type : Date, default: Date.now}
	}, {collection : "usuario"});

	var UsuarioModel = mongoose.model('usuario', UsuarioSchema);

	app.get('/api/user', function(req, res){
	var user = new UsuarioModel({_id : req.query.id, nombre: req.query.nombre, tipo_cuenta: req.query.tipo_cuenta});
	user.save(function(err,doc){
			res.json(doc);	
		});
	});

	app.get('/api/users',function(req, res){
	UsuarioModel.find(function(err, sites){
			res.json(sites);
		});
	});
	
	var RutaSchema = new mongoose.Schema({
		_id: String,
		mac : String,
		nombre_ruta : String,
		created : {type : Date, default: Date.now}
	}, {collection : "usuario"});
*/

/*
	var UsuarioSchema = new mongoose.Schema({
		_id: String,
		nombre : String,
		latitud : String,
		longitud : String,
		created : {type : Date, default: Date.now}
	}, {collection : "usuario"});

	var UsuarioModel = mongoose.model('usuario', UsuarioSchema);

	var WebSiteSchema = new mongoose.Schema({
		name: String,
		created : {type : Date, default: Date.now}
	}, {collection : "website"});

	var WebSiteModel = mongoose.model('WebSite', WebSiteSchema);

//app.use(express.static('public'));

app.get('/', function(request,response){
  response.sendFile(__dirname + '/index.html');
});

app.get('/api/usuario', function(req, res){
	var user = new UsuarioModel({_id : req.query.id, nombre: req.query.name });
	user.save(function(err,doc){
		res.json(doc);	
	});
});

app.get('/api/website/:name', function(req, res){
	var website = new WebSiteModel({name : req.params.name });
	website.save(function(err,doc){
		res.json(doc);	
	});
});

app.get('/api/usuarios',function(req, res){
	UsuarioModel.find(function(err, sites){
		res.json(sites);
	});
});

app.get('/api/website',function(req, res){
	WebSiteModel.find(function(err, sites){
		res.json(sites);
	});
});

app.get('/process', function(req, res){
	res.json(process.env);
});
*/

//app.listen(port, ip);


http.listen(8080, function() {  
  console.log("Servidor corriendo en http://localhost:8080");
});
/*
http.listen(port, ip, function() {
	console.log('Servidor listo en ' + ip + ':' + port + '...');
});
*/
