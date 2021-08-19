const express = require('express');
const passport = require('passport')
const router = express.Router();
const { User } = require('../sqlDB')
const Sequelize = require('sequelize')

// List all users
router.get('/', (req, res)=>{
  res.send('hola')
})
module.exports = router;
