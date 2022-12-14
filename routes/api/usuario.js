const { getAll, getUserById, create, getByEmail } = require('../../models/usuarios.model');
const { checkToken, checkAdmin } = require('../../helpers/middlewares');
const bcrypt = require('bcryptjs');
const { createToken } = require('../../helpers/utils');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const [usuarios] = await getAll();
        res.json(usuarios);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});
router.get('/perfil', checkToken, async (req, res) => {
    console.log(req.user);
    try {
        const [perfil] = await getUserById(req.user.id)
        res.json(perfil)
    } catch (error) {
        res.json({ fatal: error.message });
    }
})
router.get('/id/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const [usuario] = await getUserById(usuario_id)
        res.json(usuario[0])
    } catch (error) {
        res.json({ fatal: error.message });
    }
});


router.post('/registro', async (req, res) => {
    try {
        // Encripto la password
        req.body.password = bcrypt.hashSync(req.body.password, 8)

        const [result] = await create(req.body)

        res.json(result)
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Comprobar si el email está en la base de datos
    const [result] = await getByEmail(email);

    if (result.length === 0) {
        return res.json({ fatal: 'Error usuario y/o contraseña' })
    }

    const usuario = result[0]
    console.log(usuario)

    // Comprobar si las password coinciden

    const iguales = bcrypt.compareSync(password, usuario.password);

    if (!iguales) {
        return res.json({ fatal: 'Error usuario y/o contraseña' })
    }

    res.json({
        success: 'Login correcto',
        token: createToken(usuario)
    })
})


module.exports = router;