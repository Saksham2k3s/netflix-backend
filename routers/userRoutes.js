const express = require('express');
const { userRegister, Login, Logout } = require('../controllers/UserController');
const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(Login);
router.route('/logout').get(Logout)

module.exports = router;