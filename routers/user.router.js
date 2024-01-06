const express = require('express');
const { register, login, getAllUsers, getUser } = require('../controllers/user.controller');
const { createEwasteQuery, approveEWaste, rejectEWaste, newEwastesCount, getAllEwastes, getUserEwaste } = require('../controllers/ewaste.controller');
const {upload} = require('../middleware/multer')

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/create').post(upload.single('photo'),createEwasteQuery)
router.route('/approve').put(approveEWaste)
router.route('/reject').put(rejectEWaste)
router.route('/allusers').get(getAllUsers)
router.route('/user/:userid').get(getUser)
router.route('/userewaste/:userid').get(getUserEwaste)
router.route('/newewaste/count').get(newEwastesCount)
router.route('/ewastes').get(getAllEwastes)
module.exports = router
