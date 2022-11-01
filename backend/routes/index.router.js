const express = require('express');
const router = express.Router(); // for configuring routing 
const ctrlUser = require('../controllers/user.controller');
// const jwtHelper = require('../config/jwtHelper');

router.post('/signup', ctrlUser.register); //  post request for signup
// router.post('/authenticate', ctrlUser.authenticate); //  post request for authentication
// router.get('/login',jwtHelper.verifyJwtToken, ctrlUser.userProfile); //  get request for login

module.exports = router;



