const { Router } = require('express');
const user = require('./user');
const auth = require('./auth')
const messages = require('./messages')


const router = Router();

// Write the model name in plural
router.use('/users', user);
router.use('/auth', auth) 
router.use('/messages', messages)


module.exports = router;
