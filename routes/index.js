const Controller = require('../controllers/Controller');

const router = require('express').Router();

router.get('/', Controller.home);
router.get('/register', Controller.register);
router.get('/login', Controller.login);
router.get('/logout', Controller.logout);

module.exports = router;