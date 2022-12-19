const { checkToken } = require('../../helpers/middlewares');
const { createComentario, getComentarioByMenuId, getAllComentarios, deleteComentario, getComentarioByUserID } = require('../../models/comentarios.model');

const router = require('express').Router();


router.post('/nuevo', checkToken, async (req, res) => {


    try {
        const [result] = await createComentario(req.body, req.user.id)
        res.json(result)
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/menu/:menu_id', async (req, res) => {
    let comentarios = []
    const { menu_id } = req.params;
    try {
        const [response] = await getComentarioByMenuId(menu_id)
        // for (let comentario of response) {
        //     comentarios.push(comentario.nombre)
        // }
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.get('/usuario/:user_id', async (req, res) => {
    let comentarios = []
    const { user_id } = req.params;
    try {
        const [response] = await getComentarioByUserID(user_id)
        // for (let comentario of response) {
        //     comentarios.push(comentario.nombre)
        // }
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.post('/', async (req, res) => {
    let { input } = req.body
    try {
        const [response] = await getAllComentarios(input)
        res.json(response)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await deleteComentario(id)
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

module.exports = router;