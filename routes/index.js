const Controller = require('../controllers/Controller');

const router = require('express').Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/', Controller.home);
router.get('/register', Controller.register);
router.post('/register', Controller.saveUser);
router.get('/login', Controller.login);
router.post('/login', Controller.loginSuccess);
router.use(Controller.isLoggedIn);
router.get('/logout', Controller.logout);
router.get('/users/profile', Controller.profile);
router.get('/users/missions', Controller.missions);
router.get('/missions/:id/add', Controller.applyMission);
router.post('/user/profile/upload/:id', upload.single('avatar'), Controller.uploadFile)
router.use(Controller.isAdmin);
router.get('/admin', Controller.landingPageAdmin);
router.get('/admin/missions', Controller.showAllMissionForAdmin);
router.get('/admin/missions/add', Controller.addMission);
router.post('/admin/missions/add', Controller.saveMission);
router.get('/admin/missions/:id/edit', Controller.editMission);
router.post('/admin/missions/:id/edit', Controller.updateMission);
router.get('/admin/missions/:id/delete', Controller.deleteMission);
router.get('/admin/soldiers', Controller.showAllProfiles);

module.exports = router;