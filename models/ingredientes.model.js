const getIngredienteById = (ingrediente_id) => {
    try {
        return db.query('SELECT * FROM ingredientes WHERE id = ?', [ingrediente_id]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
}

const getByPlatoId = (plato_id) => {
    try {
        return db.query('SELECT id, nombre FROM ingredientes WHERE plato_id = ?', [plato_id]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};


module.exports = {
    getIngredienteById,
    getByPlatoId
}