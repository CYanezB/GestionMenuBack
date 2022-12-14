
const { create, getAll, getMenuById, deleteById } = require('../../models/menu.model');

const router = require('express').Router();

router.post('/new', async (req, res) => {

    try {
        const [menuCreado] = await create(req.body)
        res.json(menuCreado)
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('', async (req, res) => {
    try {
        const [menus] = await getAll()
        res.json(menus)
    } catch (error) {
        res.json({ fatal: error.message });
    }
})

router.get('/:menu_id', async (req, res) => {
    const { menu_id } = req.params;
    try {
        const [menu] = await getMenuById(menu_id)
        res.json(menu[0])
    } catch (error) {
        res.json({ fatal: error.message });
    }
});
router.delete('/delete/:menu_id', async (req, res) => {

    try {
        const { menu_id } = req.params;

        const [result] = await deleteById(menu_id);

        res.json(result)
    } catch (error) {
        res.json({ fatal: error.message });
    }
});


module.exports = router;