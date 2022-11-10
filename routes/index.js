const Controller = require('../controllers/Controller');

const router = require('express').Router();

router.get('/', Controller.home);

router.get('/admin', Controller.landingPageAdmin);
router.get('/admin/missions', Controller.showAllMissionForAdmin);
router.get('/admin/missions/add', Controller.addMission);
router.post('/admin/missions/add', Controller.saveMission);
router.get('/admin/missions/:id/edit', Controller.editMission);
router.post('/admin/missions/:id/edit', Controller.updateMission);
router.get('/admin/missions/:id/delete', Controller.deleteMission);
router.get('/admin/soldiers', Controller.showAllProfiles);

router.get('/user', Controller.landingPageUser);
router.get('/user/missions', Controller.landingPageUser);
router.get('/user/profile', Controller.showProfileUser);
router.get('/register', Controller.register);
router.get('/login', Controller.login);
router.get('/logout', Controller.logout);

module.exports = router;