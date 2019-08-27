// este archivo es muy importante porque es el punto de entrada para la aplicacion, aqui se va a 
// escribir todo el codigo de js que va a inicializar el servidor de express entre otras cosas: DB, rutas, auth

// Requires: es una importacion de librerias ya sea de treceros o personalizadas que ocupamos para que funcione algo


// Requires

var express = require('express'); // primero necesitamos poder cargar la libreria de express
var mongoose = require('mongoose');

// Inicializar variables

var app = express();

// Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/hospitalDB', (err, resp) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});

// Rutas

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    })
});


// Escuchar peticiones

app.listen(3000, () => {
    console.log('Express serve puerto 3000: \x1b[32m%s\x1b[0m', 'online');
})