// este archivo es muy importante porque es el punto de entrada para la aplicacion, aqui se va a 
// escribir todo el codigo de js que va a inicializar el servidor de express entre otras cosas: DB, rutas, auth

// Requires: es una importacion de librerias ya sea de treceros o personalizadas que ocupamos para que funcione algo


// Requires

var express = require('express'); // primero necesitamos poder cargar la libreria de express
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables

var app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Importar rutas

var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');

// Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/hospitalDB', (err, resp) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

// Server index congig

// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));

// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);

app.use('/', appRoutes);
// Escuchar peticiones

app.listen(3000, () => {
    console.log('Express serve puerto 3000: \x1b[32m%s\x1b[0m', 'online');
})