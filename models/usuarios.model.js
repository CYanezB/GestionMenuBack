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

const asignarCurso = (usuario_id, ciclos_id) => {
    try {
        return db.query('insert into usuario_has_ciclos (usuario_id, ciclos_id) values (?, ?)',
            [usuario_id, ciclos_id]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
}


const getByEmail = (email) => {
    return db.query('select * from usuario where email = ?', [email])
}

const getByRole = (role) => {
    return db.query('select * from usuario where role = ?', [role])
}

const getUserByName = (input) => {
    return db.query('SELECT * FROM usuario WHERE nombre LIKE ? OR email LIKE ?', [`%${input}%`, `%${input}%`])
};

const updateRole = (usuario_id, { role }) => {
    return db.query('UPDATE usuario SET role = ? WHERE id = ?', [role, usuario_id])
};

const deleteUser = (usuario_id) => {
    return db.query('DELETE FROM usuario WHERE id = ?', [usuario_id])
}




module.exports = {
    getAll,
    getUserById,
    create,
    getByEmail,
    getByRole,
    getUserByName,
    updateRole,
    deleteUser,
    asignarCurso
}