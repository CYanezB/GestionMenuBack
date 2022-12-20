const { getAll, getUserById, create, getByEmail, getByRole, getUserByName, updateRole, deleteUser } = require('../../models/usuarios.model');
const { checkToken, checkAdmin } = require('../../helpers/middlewares');
const bcrypt = require('bcryptjs');
const { createToken, getDateOfISOWeek, selectWeek, sendMail } = require('../../helpers/utils');
const { getByDateAndCiclo } = require('../../models/menu.model');
const dayjs = require('dayjs')

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

router.get('/role/:role', async (req, res) => {
    const { role } = req.params;
    try {
        const [usuario] = await getByRole(role)
        res.json(usuario)
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.post('/filtro', async (req, res) => {
    const { input } = req.body;
    try {
        const [usuario] = await getUserByName(input)
        res.json(usuario)
    } catch (error) {
        res.json({ fatal: error.message });
    }
});


router.post('/registro', async (req, res) => {
    try {
        // Encripto la password
        req.body.password = bcrypt.hashSync(req.body.password, 8)

        const [result] = await create(req.body)
        let mail = {
            user_mail: req.body.email,
            asunto: "Registro en SchoolMenu",
            innerhtml: "<p>Bienvenido a SchoolMenu</p>"
        }
        sendMail(mail)
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

});

router.put('/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const [result] = await updateRole(usuario_id, req.body);
        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.delete('/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const [result] = await deleteUser(usuario_id)

        res.json(result);
    } catch (error) {
        res.json({ fatal: error.message })
    }
});

router.post('/semana', async (req, res) => {

    const { semana, ano, ciclo_id } = req.body;

    let firstWeekDay = getDateOfISOWeek(semana, ano)
    const arrDays = selectWeek(firstWeekDay)
    const arrMenus = []
    for (let day of arrDays) {
        let formatedDate = dayjs(day).format('YYYY-MM-DD')
        const [response] = await getByDateAndCiclo(formatedDate, ciclo_id)
        arrMenus.push(response[0] || null);
    }
    res.json(arrMenus)
});

router.post('/sendmail', async (req, res) => {
    sendMail(req.body)
})

module.exports = router;