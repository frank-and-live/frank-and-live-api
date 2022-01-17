const express = require('express');

const router = express.Router();

router
  .get('/', function(req, res, next) {
    res.render('index', { title: 'frank & live' })
  })
  .get('/login', function(req, res, next) {
    res.render('login', { title: 'frank & live' })
  })
  .get('/register', function(req, res, next) {
    res.render('register', { title: 'frank & live' })
  })
  .get('/profile', function(req, res, next) {
    res.render('profile', { title: 'frank & live' })
  })

module.exports = router;
