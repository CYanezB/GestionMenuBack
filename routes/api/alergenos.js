const { getAlergenoById, getAlergenoByPLatoId } = require('../../models/alergenos.model');

const router = require('express').Router();

router.get('/:alergeno_id', async (req, res) => {
    const { alergeno_id } = req.params;
    try {
        const alergeno = await getAlergenoById(alergeno_id)
        res.json(alergeno[0])
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/plato/:plato_id', async (req, res) => {
    let alergenos = []
    const { plato_id } = req.params;
    try {
        const [response] = await getAlergenoByPLatoId(plato_id)
        for (let alergeno of response) {
            alergenos.push(alergeno.nombre)
        }
        res.json(alergenos)
    } catch (error) {
        res.json({ fatal: error.message });
    }

});



module.exports = router;