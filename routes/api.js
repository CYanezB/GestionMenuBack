const router = require('express').Router();

router.use('/platos', require('./api/platos'));
router.use('/menus', require('./api/menus'));
router.use('/alergenos', require('./api/alergenos'));
router.use('/ingredientes', require('./api/ingredientes'));
router.use('/ciclos', require('./api/ciclos'));
router.use('/usuarios', require('./api/usuario'));
router.use('/comentarios', require('./api/comentarios'))

module.exports = router;