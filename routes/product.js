const express = require('express');

const router = express.Router();

//controllers
const getProduct = require('../controllers/getProduct');
const { getUserRating, postUserRating } = require('../controllers/userRating');
const { registerUser, postRegisterUser } = require('../controllers/registerUser');
const { loginUser, postLoginUser } = require('../controllers/loginUser');
const logoutUser = require('../controllers/logoutUser');

//middleware
const { loginAuth, ensureAuth } = require('../middlewares/loginAuth');

router.get('/', getProduct);
router.get('/rating', ensureAuth, getUserRating);
router.get('/register', registerUser);
router.get('/login', loginAuth, loginUser);
router.get('/logout', logoutUser);

router.post('/rating', postUserRating);
router.post('/register', postRegisterUser);
router.post('/login', postLoginUser);

module.exports = router;