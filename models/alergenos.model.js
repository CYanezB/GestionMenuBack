const getAlergenoById = (alergeno_id) => {
    try {
        return db.query('SELECT * FROM alergenos WHERE id = ?', [alergeno_id]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
}

const getAlergenoByPLatoId = (plato_id) => {
    try {
        return db.query('SELECT * FROM gestionmenuback_sql.alergenos a JOIN alergenos_has_plato ap ON ap.alergenos_id = a.id WHERE ap.plato_id = ?', [plato_id])
    } catch (error) {
        res.json({ fatal: error.message });
    }
};


module.exports = {
    getAlergenoById,
    getAlergenoByPLatoId
}