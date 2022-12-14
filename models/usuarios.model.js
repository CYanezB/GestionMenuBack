const getAll = () => {
    return db.query('select * from usuario');
}

const getUserById = (usuario_id) => {
    return db.query('select * from usuario where id = ?', [usuario_id])
};

const create = ({ nombre, email, password, role = 'tutor' }) => {
    try {
        return db.query('insert into usuario (nombre, email, password, role) values (?, ?, ?, ?)',
            [nombre, email, password, role]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
}


const getByEmail = (email) => {
    return db.query('select * from usuario where email = ?', [email])
}


module.exports = {
    getAll,
    getUserById,
    create,
    getByEmail
}