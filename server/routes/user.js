const express = require('express');
const router = express.Router();
const { User, Message } = require('../sqlDB')

// List all users
router.get('/', async (req, res)=>{
  await User.findAll({
    include:[{
      model: Message
    }]
  })
  .then(response => {
    res.send(response)
  })
  .catch(error => {
    res.send(error)
  })
})

router.get('/getOneUser/:param/:keyword', async (req, res) => {
  const { keyword, param } = req.params
  const user = await User.findAll({where:{ [param]:keyword}, include: [{model: Message}]})
  if(user.length){
    res.send({user})
  }else{
    res.status(404).send({message:"el usuario no existe"})
  }
})

router.post('/create', async(req, res) => {
  const { userName, password, name, userRole } = req.body

    await User.create({userName, password, name, userRole})
    .then(response => {
      res.json({data: response, message: "el usuario fue creado correctamente" })
    })
    .catch(error => {
      res.status(400).send({message: "este usuario ya existe"})
    })
})
module.exports = router;
