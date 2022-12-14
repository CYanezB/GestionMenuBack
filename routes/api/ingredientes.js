const { getIngredienteById, getByPlatoId } = require('../../models/ingredientes.model');

const router = require('express').Router();

router.get('/:ingrediente_id', async (req, res) => {
    const { ingrediente_id } = req.params;
    try {
        const ingrediente = await getIngredienteById(ingrediente_id)
        res.json(ingrediente[0])
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/plato/:plato_id', async (req, res) => {
    let ingredientes = []
    const { plato_id } = req.params;
    try {
        const [response] = await getByPlatoId(plato_id)
        for (let ingrediente of response) {
            ingredientes.push(ingrediente.nombre)
        }
        res.json(ingredientes)
    } catch (error) {
        res.json({ fatal: error.message });
    }

});



module.exports = router;