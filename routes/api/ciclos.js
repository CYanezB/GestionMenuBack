const { asignarCiclo, getCicloById, deleteById, getMenuByCicloId } = require('../../models/ciclos.model');
const { getMenuById } = require('../../models/menu.model');

const router = require('express').Router();

router.post('/assign', async (req, res) => {

    try {
        const [cicloAsignado] = await asignarCiclo(req.body)
        res.json(cicloAsignado)
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/:ciclos_id', async (req, res) => {
    const { ciclos_id } = req.params;
    try {
        const [ciclos] = await getCicloById(ciclos_id)
        res.json(ciclos[0])
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/menus/:ciclo_id', async (req, res) => {
    const { ciclo_id } = req.params;
    let menus = []
    try {
        const [menus_id] = await getMenuByCicloId(ciclo_id)

        for (let menu of menus_id) {
            [m] = await getMenuById(menu.menu_id)
            menus.push(m[0])
        }
        res.json(menus)
    } catch (error) {
        res.json({ fatal: error.message });
    }
});



module.exports = router;