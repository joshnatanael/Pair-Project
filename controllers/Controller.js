const {Mission, Soldier, User} = require('../models');
const bcrypt = require('bcryptjs');

class Controller{
  static home(req, res){
    const errors = req.query.errors;
    res.render('home', {errors});
  }
  static register(req, res){
    const errors = req.query.errors;
    res.render('auth/register', {errors})
  }
  static saveUser(req, res){
    let {fullName, age, gender, profilePictureUrl, username, email, password, role} = req.body;
    User.create({ username, email, password, role })
      .then(createdUser=>{
        return Soldier.create({fullName, age, gender,profilePictureUrl, UserId:createdUser.id})
      })
      .then(_=>{
        res.redirect('/login');
      })
      .catch(err=>{
        if(err.name === "SequelizeValidationError"){
          res.redirect(`/register?errors=${err.errors.map(error=>error.message)}`);
        }
        else{
          res.send(err);
        }
      })
  }
  static login(req, res){
    const errors = req.query.errors;
    res.render('auth/login', {errors});
  }
  static loginSuccess(req, res){
    const {username, password} = req.body;
    User.findOne({ where: { username } })
      .then(user=>{
        if(user){
          if(bcrypt.compareSync(password, user.password)){
            req.session.userId = user.id;
            req.session.role = user.role;
            if(user.role === "Admin"){
              return res.redirect('/admin')  
            }
            else{
              return res.redirect('/users/profile')
            }
          }
        }
        const errors = `Invalid username/password`;
        return res.redirect(`/login?errors=${errors}`);
      })
      .catch(err=>{
        res.send(err);
      })
  }
  static isLoggedIn(req, res, next){
    if(req.session.userId){
      next()
    }
    else{
      const errors = `Please log in first`;
      return res.redirect(`/login?errors=${errors}`);
    }
  }
  static logout(req, res){
    req.session.destroy(err=>{
      if(err){
        res.send(err);
      }
      else{
        res.redirect('/login');
      }
    })
  }
  static profile(req, res){
    const errors = req.query.errors;
    Soldier.findOne({
      where: {
        id: +req.session.userId
      },
      include: {
        model: User,
        include: Mission
      }
    })
      .then(soldierData=>{
        res.render('profile', {soldierData, errors});
      })
      .catch(err=>{
        res.send(err);
      })
  }
  static missions(req, res){
    const errors = req.query.errors;
    Mission.findAll({
      where: {
        UserId: null
      }
    })
      .then(missionsData=>{
        res.render('missions', {missionsData, errors});
      })
      .catch(err=>{
        res.send(err);
      })
  }
  static applyMission(req, res){
    Mission.update({ UserId: +req.session.userId }, {
      where: {
        id: +req.params.id
      }
    })
      .then(_=>{
        res.redirect('/users/missions');
      })
      .catch(err=>{
        res.send(err);
      })
  }
  static isAdmin(req, res, next){
    if(req.session.role === "Admin"){
      next()
    }
    else{
      const errors = `Access denied! Please contact admin!`;
      return res.redirect(`/users/profile?errors=${errors}`);
    }
  }
  static landingPageAdmin(req, res){
    res.render('landingPageAdmin')
  }
  static showAllMissionForAdmin(req, res){
    const { location, level } = req.query
    let options = {
      include: User
    }
    if(location){
      options.where = {
        location: location
      }
    }

    if(level){
      options.where = {
        levelOfDifficulty: level
      }
    }
    Mission.findAll(options)
    .then(missions => {
      res.render('showAllMissionByAdmin', { missions })
    })
    .catch(err => {
      res.send(err)
    })
  }
  static addMission(req, res){
    const { errors } = req.query
    res.render('addMissionForm', { errors })
  }
  static saveMission(req, res){
    const { name, location, point } = req.body
    Mission.create({ name, location, point })
    .then(_ => {
      res.redirect('/admin/missions')
    })
    .catch(err => {
      if(err.name === 'SequelizeValidationError'){
        const errors = err.errors.map(el => el.message)
        res.redirect(`/admin/missions/add?errors=${errors}`)
      }
      else{
        res.send(err)
      }
    })
  }
  static editMission(req, res){
    const { errors } = req.query
    const { id } = req.params
    Mission.findByPk(+id)
    .then(mission => {
      res.render('editMissionForm', { mission, errors })
    })
    .catch(err => {
      res.send(err)
    })
  }
  static updateMission(req, res){
    const { name, location, point } = req.body
    Mission.update({ name, location, point }, {
      where: {
        id: +req.params.id
      },  
      returning: true,
      individualHooks: true
    })
    .then(_ => {
      res.redirect('/admin/missions')
    })
    .catch(err => {
      if(err.name === 'SequelizeValidationError'){
        const errors = err.errors.map(el => el.message)
        res.redirect(`/admin/missions/${+req.params.id}/edit?errors=${errors}`)
      }
      else{
        res.send(err)
      }
    })
  }
  static deleteMission(req, res){
    Mission.destroy({
      where: {
        id: +req.params.id
      }
    })
    .then(_ => {
      res.redirect('/admin/missions')
    })
    .catch(err => {
      res.send(err)
    })
  }
  static showAllProfiles(req, res){
    Soldier.showAllProfileUser()
    .then(soldier => {
      res.render('showAllSoldiers', { soldier })
    })
    .catch(err => {
      res.send(err)
    })
  }
  static deleteMission(req, res){
    Mission.destroy({
      where: {
        id: +req.params.id
      }
    })
    .then(_ => {
      res.redirect('/admin/missions')
    })
    .catch(err => {
      res.send(err)
    })
  }
  static uploadFile(req, res, next) {
    Mission.update({ status: true }, {
      where: {
        id: +req.params.id
      }
    })
    .then(_ => {
      res.redirect('/users/profile')
    })
    .catch(err => {
      res.send(err)
    })
  }
  static isSoldier(req, res, next){
    if(req.session.role === "Soldier"){
      next()
    }
    else{
      const errors = `Soldier only!`;
      return res.redirect(`/users/profile?errors=${errors}`);
    }
  }
}

module.exports = Controller;