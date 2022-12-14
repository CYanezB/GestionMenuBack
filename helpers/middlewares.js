const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const { getUserById } = require('../models/usuarios.model');


const checkToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.json({ fatal: 'Debes incluir la cabecera de authorization' });
    }

    const token = req.headers['authorization'];

    let obj;
    try {
        obj = jwt.verify(token, 'en un lugar de la mancha');
    } catch (error) {
        return res.json({ fatal: 'El token es incorrecto' })
    }

    if (dayjs().unix() > obj.exp_at) {
        return res.json({ fatal: 'El token está caducado' });
    }



    const [user] = await getUserById(obj.user_id);
    req.user = user[0]


    next();
}

const checkAdmin = (req, res, next) => {

    if (req.user.role !== 'admin') {
        return res.json({ fatal: 'El usuario no tiene permisos para realizar esta acción' });
    }
    next();
}

module.exports = {
    checkToken,
    checkAdmin
}