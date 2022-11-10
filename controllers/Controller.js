const capitalizeFirstWords = require('../helpers/formattingNameMission')
const { Mission, Soldier, User } = require('../models')

class Controller{
  static home(req, res){
    res.redirect('/user')
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
      res.render('showAllMissionByAdmin', { missions, capitalizeFirstWords })
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
    Soldier.findAll({ 
      include: {
        model: User,
        include: Mission
      }
    })
    .then(soldier => {
      res.render('showAllSoldiers', { soldier })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static landingPageUser(req, res){
    res.render('landingPageUser')
  }

  static showProfileUser(req, res){
    Soldier.findByPk(1, { 
      include: {
        model: User,
        include: Mission
      }
    })
    .then(soldier => {
      res.render('profileUser', { soldier })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static register(req, res){
    
  }
  static login(req, res){
    
  }
  static logout(req, res){
    
  }
}

module.exports = Controller;