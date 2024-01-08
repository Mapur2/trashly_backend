const express = require('express');
const { message, reply, getAllMessages, getUserMessage, getNewMessageCount } = require('../controllers/message.controller');

const router=express.Router()

router.route('/message').post(message)
router.route('/reply').put(reply)
router.route('/allmessages').get(getAllMessages)
router.route('/usermessage').post(getUserMessage)
router.route('/countMessages').get(getNewMessageCount)

module.exports=router