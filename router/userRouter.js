const express = require('express');
const {registerUser, loginUser, getUser} = require('../controllers/user.controller');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getUser);

module.exports = router;