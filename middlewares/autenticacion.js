var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

//========================================
// Verificar token (MIDELWARE)
//========================================

// ller el token, procesarlo, ver si no a expirado 

exports.verificarToken = function(req, res, next) {
    var token = req.query.token;
    // una ves que ya lo tenga hay que verificar que sea valido
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();
    });
}

//========================================
// Verificar Admin (MIDELWARE)
//========================================

exports.verificarAdmin_role = function(req, res, next) {


    var usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {

        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es administrador',
            errors: { message: 'No es administrador, no puede hacer eso' }
        });

    }
}