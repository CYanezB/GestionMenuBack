const asignarCiclo = ({ ciclos_id, menu_id, fecha }) => {
    return db.query('insert into ciclos_has_menu (ciclos_id, menu_id, fecha) values (?, ?, ?)',
        [ciclos_id, menu_id, fecha])
};

const getMenuByCicloId = (ciclo_id) => {
    return db.query('select menu_id from ciclos_has_menu where ciclos_id = ?', [ciclo_id])
};


const getCicloById = (ciclos_id) => {
    return db.query('select * from ciclos where id = ?', [ciclos_id])
}

const getCiclosByUsuarioId = (usuario_id) => {
    return db.query('select * from usuario_has_ciclos uc join ciclos c on c.id = uc.ciclos_id where usuario_id = ?', [usuario_id])
}


module.exports = {
    asignarCiclo,
    getCicloById,
    getMenuByCicloId,
    getCiclosByUsuarioId
}