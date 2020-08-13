const express = require('express');
const router = express.Router();
const db = require('../models')
const passport = require('../config/ppConfig')

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/signup', (req, res)=>{
  console.log(req.body)
  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  })
    .then(([user, created])=>{
      if (created){
        console.log(`${user.name} was created`)
       passport.authenticate('local',{
          sucessRedirect: '/',
         successFlash: 'account created'
       })(req, res)

        //res.redirect('/')
      } else {
        //email already exist
        console.log('email already exist')
        req.flash('email exist')
        res.redirect('/auth/signup')
      }
    })
    .catch(err =>{
      console.log('error', err)
      req.flash(`error.. ${err}`)
      res.redirect('/auth/signup')
    })
})
router.post('/login', passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'welcome back',
  failureFlash: 'incorrect email or passwrod, try again'
}))

//log out
router.get('/logout', (req, res)=>{
  req.logOut()
  // flash message
  req.flash('see you soon. logging out')
  res.redirect('/')
})

module.exports = router;
