const express = require('express');
const { message, reply, getAllMessages } = require('../controllers/message.controller');

const router=express.Router()

router.route('/message').post(message)
router.route('/reply').post(reply)
router.route('/allmessages').post(getAllMessages)
router.route('')

module.exports=router