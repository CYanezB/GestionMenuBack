const createComentario = ({ mensaje, menu_id }, user_id) => {
    try {
        return db.query('insert into comentarios (user_id, mensaje, menu_id) values (?, ?, ?)',
            [user_id, mensaje, menu_id]);
    } catch (error) {
        res.json({ fatal: error.message });
    }
};
const getComentarioByMenuId = (menu_id) => {
    try {
        return db.query(`select * from comentarios c
        JOIN usuario u ON u.id = c.user_id
        where menu_id = ?`, [menu_id])
    } catch (error) {
        res.json({ fatal: error.message })
    }
}

const getAllComentarios = (input = '') => {
    try {
        return db.query(`select c.*, u.nombre from comentarios c
        JOIN usuario u
        ON u.id = c.user_id
        WHERE u.nombre LIKE ?
        ORDER BY c.fecha DESC
        `, [`%${input}%`])
    } catch (error) {
        res.json({ fatal: error.message })
    }
}


const getComentarioByUserID = (user_id) => {
    try {
        return db.query('select * from comentarios where user_id = ?', user_id)
    } catch (error) {
        res.json({ fatal: error.message })
    }
}

const deleteComentario = (id) => {
    try {
        return db.query('delete from comentarios where id = ?', id)
    } catch (error) {
        res.json({ fatal: error.message })
    }
}

module.exports = {
    createComentario,
    getComentarioByMenuId,
    getAllComentarios,
    deleteComentario,
    getComentarioByUserID
}