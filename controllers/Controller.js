const {Mission, Soldier, User} = require('../models');
const bcrypt = require('bcryptjs');

class Controller{
  static home(req, res){
    res.render('home');
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
            return res.redirect('/profile')
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
    Soldier.findOne({
      where: {
        id: +req.session.userId
      },
      include: User
    })
      .then(soldierData=>{
        res.render('profile', {soldierData});
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
        res.redirect('/missions');
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
      return res.redirect(`/missions?errors=${errors}`);
    }
  }
  static addMission(req, res){
    const errors = req.query.errors;
    res.render('add-mission', {errors})
  }
  static saveMission(req, res){
    const {name, location, levelOfDifficulty, point} = req.body;
    Mission.create({name, location, levelOfDifficulty, point})
      .then(_=>{
        res.redirect('/missions');
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
}

module.exports = Controller;