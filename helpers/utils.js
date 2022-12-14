const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');


const getAll = () => {
    return db.query('select * from plato');
}

const createToken = (usuario) => {
    const obj = {
        user_id: usuario.id,
        user_role: usuario.role,
        exp_at: dayjs().add(5, 'days').unix()
    }
    return jwt.sign(obj, 'en un lugar de la mancha')
}

module.exports = {
    getAll,
    createToken
}