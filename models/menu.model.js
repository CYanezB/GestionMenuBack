const getAll = () => {
    return db.query(`SELECT m.*, p.nombre as primer_plato, ps.nombre AS segundo_plato, pp.nombre AS nombre_postre
    FROM gestionmenuback_sql.menu m
    JOIN plato p ON m.primero = p.id
    JOIN plato ps ON m.segundo = ps.id
    JOIN plato pp ON m.postre = pp.id`);
}

const create = ({ primero, segundo, postre }) => {
    try {
        return db.query('insert into menu (primero, segundo, postre) values (?, ?, ?)',
            [primero, segundo, postre]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
}

const getMenuById = (menu_id) => {
    try {
        return db.query(`SELECT m.*, p.nombre as primer_plato, ps.nombre AS segundo_plato, pp.nombre AS nombre_postre
        FROM gestionmenuback_sql.menu m
        JOIN plato p ON m.primero = p.id
        JOIN plato ps ON m.segundo = ps.id
        JOIN plato pp ON m.postre = pp.id
        WHERE m.id = ?
        `, [menu_id]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
}
const deleteById = (menu_id) => {
    return db.query('delete from menu where id = ?', [menu_id])
}


module.exports = {
    getAll,
    create,
    getMenuById,
    deleteById
}