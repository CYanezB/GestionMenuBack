const getAll = () => {
    return db.query('select * from plato');
}

const getByCategoria = (categoria) => {
    return db.query('select * from plato where categoria = ?', [categoria])
}

const create = ({ nombre, categoria }) => {
    try {
        return db.query('insert into plato (nombre, categoria) values (?, ?)',
            [nombre, categoria]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
}

const ingredientesSeleccionados = (ingrediente, plato_id) => {
    return db.query('insert into ingredientes (nombre, plato_id) values (?, ?)',
        [ingrediente, plato_id]);
}

const alergenosSeleccionados = (alergenos_id, plato_id) => {
    return db.query('insert into alergenos_has_plato (alergenos_id, plato_id) values (?, ?)',
        [alergenos_id, plato_id])
}

const getPlatoById = (plato_id) => {
    return db.query('select * from plato where id = ?', [plato_id])
}



module.exports = {
    getAll,
    create,
    ingredientesSeleccionados,
    alergenosSeleccionados,
    getByCategoria,
    getPlatoById
}