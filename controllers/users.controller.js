const User = require('../models/User.model')
const mongoose = require('mongoose')

module.exports.register = (req, res, next)=>{
    res.render('users/register-form')
}

module.exports.doRegister = (req, res, next)=>{
    const fields = {
        ...req.body,
        image: req.file.path
      }
    
      // O añadir el key value image a req.body del tiron
      // req.body.image = req.file.path
    
      User.create(fields)
        .then(() => {
          res.redirect('/')
        })
        .catch(error => {
          // Para autorellenar el formulario cuando haya errores, pasamos todos los valores del req.body, menos la password
          const values = {...req.body}
          delete values.password
    
          if (error instanceof mongoose.Error.ValidationError) {
            res.render('users/register-form', {
              errors: error.errors,
              values
            })
          } else if (error.code && error.code === 11000) {
            const errors = {}
    
            if (error.keyValue.email) {
              errors.email = 'Ya existe un usuario con este email'
            }
    
            if (error.keyValue.username) {
              errors.username = 'Ya existe un usuario con este nombre'
            }
    
            res.render('users/register-form', { errors, values })
          } else {
            next(error)
          }
    
        })
}

module.exports.login = (req, res, next)=>{
    res.render('auth/login-form')
}

module.exports.doLogin = (req, res, next)=>{
    console.log("***email del usuario***",req.body)
// Funcion para renderizar el formulario con el error
const renderWithErrors = () => {
    res.render('auth/login', { error: 'Email o contraseña incorrectos', email: req.body.email })
  }
  // Busco si hay un usuario con ese email
  // User.findOne({$or: [ { email: req.body.email }, { username: req.body.email } ]})
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return renderWithErrors()
      }

      // Aqui asumo que si tengo usuario, compruebo las contraseñas
      return user.checkPassword(req.body.password)
        .then(match => {
          if (!match) {
            return renderWithErrors()
          }
          console.log('SESSION =====> ', req.session);
          req.session.userId = user.id; // genero cookie y session
          res.redirect('/')
        })
    })
    .catch(err => {
      next(err)
    })
}

module.exports.displayProfile = (req,res,next)=>{
    res.render('users/profile')
}