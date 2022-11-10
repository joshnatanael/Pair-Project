const Controller = require('../controllers/Controller');

const router = require('express').Router();

router.get('/', Controller.home);
router.get('/register', Controller.register);
router.post('/register', Controller.saveUser);
router.get('/login', Controller.login);
router.post('/login', Controller.loginSuccess);
router.use(Controller.isLoggedIn);
router.get('/logout', Controller.logout);
router.get('/profile', Controller.profile);
router.get('/missions', Controller.missions);
router.use(Controller.isAdmin);
router.get('/missions/add', Controller.addMission);
router.post('/missions/add', Controller.saveMission);
router.get('/missions/:id/add', Controller.applyMission);

module.exports = router;