const express = require('express');
const router = express.Router();
const { User } = require('../sqlDB')

// List all users
router.get('/', async (req, res)=>{
  await User.findAll()
  .then(response => {
    res.send(response)
  })
  .catch(error => {
    res.send(error)
  })
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
