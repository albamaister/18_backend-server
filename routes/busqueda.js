var express = require('express');

var app = express();

var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Usuario = require('../models/usuario');


// ===========================================================================
// Busqueda por coleccion
// ===========================================================================


app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var tabla = req.params.tabla;
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {

        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;

        case 'medicos':
            promesa = buscarMedicos(busqueda, regex);
            break;

        case 'hospitales':
            promesa = buscarHospitales(busqueda, regex);
            break;

        default:
            res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda solo son: Usuarios, medicos y hospitales',
                error: { message: 'Tipo de tabla/coleccion no válido' }

            });


    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data

        });

    });

});



// ===========================================================================
// Busqueda general
// ===========================================================================



app.get('/todo/:busqueda', (req, res, next) => {

    // primero extraigamos el parametro de busqueda, luego para poder buscar hospitales hay que importar el modelo
    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([buscarHospitales(busqueda, regex), buscarMedicos(busqueda, regex), buscarUsuarios(busqueda, regex)])
        .then(respuestas => {

            res.status(200).json({
                ok: true,
                hospitales: respuestas[0],
                medicos: respuestas[1],
                usuarios: respuestas[2]

            });
        })


});


function buscarHospitales(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Hospital.find({ nombre: regex })
            .populate('usuario', 'nombre email')
            .exec((err, hospitales) => {

                if (err) {

                    reject('Error al cargar hospitales ', err);

                } else {
                    resolve(hospitales);
                }

            });
    });


}


function buscarMedicos(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Medico.find({ nombre: regex })
            .populate('usuario', 'nombre email img')
            .populate('hospital')
            .exec((err, medicos) => {

                if (err) {

                    reject('Error al cargar medicos ', err);

                } else {
                    resolve(medicos);
                }

            });
    });


}


function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Usuario.find({}, 'nombre email role google img').or([{ 'nombre': regex }, { 'email': regex }])
            .exec((err, usuarios) => {


                if (err) {
                    reject('Error al cargar usuarios ', err);
                } else {
                    resolve(usuarios);
                }

            });
    });


}

module.exports = app;