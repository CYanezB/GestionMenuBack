const router = require('express').Router();
const { getAlergenoByPLatoId } = require('../../models/alergenos.model');
const { getByPlatoId } = require('../../models/ingredientes.model');
const { getAll, create, ingredientesSeleccionados, alergenosSeleccionados, getByCategoria, getPlatoById } = require('../../models/plato.model')


router.get('/', async (req, res) => {

    try {
        const [platos] = await getAll();
        res.json(platos);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/:plato_id', async (req, res) => {
    const { plato_id } = req.params;

    try {
        const [datosPlato] = await getPlatoById(plato_id)
        const [ingredientes] = await getByPlatoId(plato_id)
        const [alergenos] = await getAlergenoByPLatoId(plato_id)

        let plato = datosPlato[0]
        plato.ingredientes = ingredientes;
        plato.alergenos = alergenos;
        res.json(plato)


        // const respuestaIngredientes = []
        // for (let ingrediente of response[0]) {
        //     respuestaIngredientes.push(ingrediente.nombre)
        // }
        // const respuestaAlergenos = []
        // for (let alergeno of alergenos) {
        //     respuestaAlergenos.push(alergeno.nombre)
        // }
        // const plato = {
        //     data: datosPlato[0],
        //     ingredientes: respuestaIngredientes,
        //     alergenos: respuestaAlergenos
        // }
        // recuperar ingredientes por plato
        // SELECT * FROM ingredientes WHERE plato_id = 21
        // plato.ingredientes = lo q devuelva la query de arriba

        // SELECT * FROM gestionmenuback_sql.alergenos a
        // JOIN alergenos_has_plato ap ON ap.alergenos_id = a.id
        // WHERE ap.plato_id = 18
        // plato.alergenos = lo q devuelva la query de arriba


    } catch (error) {
        res.json({ fatal: error.message });
    }
})

router.get('/cat/:categoria', async (req, res) => {
    const { categoria } = req.params;
    try {
        const [result] = await getByCategoria(categoria);
        // console.log(result);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});


router.post('/new', async (req, res) => {

    try {
        const [platoCreado] = await create(req.body)
        for (let ingrediente of req.body.ingredientes) {
            const [ingredientes] = await ingredientesSeleccionados(ingrediente, platoCreado.insertId)
        }
        for (let alergenos_id of req.body.alergenos) {
            const [alergenos] = await alergenosSeleccionados(alergenos_id, platoCreado.insertId)
        }
        res.json(platoCreado)
    } catch (error) {
        res.json({ fatal: error.message });
    }
});



/**
 * req.body = nombre: string,
    ingredientes: string[],
    alergenos: string[],
    categoria: string

    - Insertar registro en tabla PLATOS (req.body.nombre, req.body.categoria)
    - La accion anterior nos devuelve el ID del plato insertado
    - Para cada ingrediente insertar en la tabla INGREDIENTES el nombre y el ID del PLATO
    - Para cada alérgeno en la tabla 'alergeno_has_plato' insertar un registro con el ID del alérgeno y el ID del plato
*/



module.exports = router;