const express = require('express');
const passport = require('passport')
const router = express.Router();
const { User, Message } = require('../sqlDB')
const Sequelize = require('sequelize')

router.get('/', (req,res) => {
    const today = new Date()
    Message.findAll()
    .then(response =>{
        res.send({response, today})
    })
})

router.post('/createMessage', async (req, res) => {
    const { userName, message } = req.body
    const user = await User.findAll({where:{
        userName: userName
    }})
    const newMessage = await Message.create({message})
    // .then(resp => {
    //     res.send(resp)
    // })
    await newMessage.setUser(user[0].id)
    .then(response =>{
        res.send({response:response, message:"mensaje creado", user})
    })
})

module.exports = router;