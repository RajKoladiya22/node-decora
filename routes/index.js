const express = require('express');
const multer = require('multer');
const passport = require('passport');

const file = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const imagedata = multer({ storage: file }).single('image');

const routs = express.Router();

const indexcontroller = require('../controller/indexcontroller');    

routs.get('/', indexcontroller.login);
routs.post('/logindata', passport.authenticate('local', { failureRedirect: '/' }), indexcontroller.logindata);
routs.get('/register', indexcontroller.register);
routs.post('/registerdata', indexcontroller.registerdata);
routs.get('/otpcode', indexcontroller.otpcode);
routs.post('/userRegister', indexcontroller.userRegister);
routs.get('/index', indexcontroller.index);
routs.get('/forgetpassword', indexcontroller.forgetpassword);
routs.post('/fpassword', indexcontroller.fpassword);
routs.get('/otp', indexcontroller.otp);
routs.post('/otpdata', indexcontroller.otpdata);
routs.get('/resetpassword', indexcontroller.resetpassword);
routs.post('/npassword', indexcontroller.npassword);
routs.get('/logout', indexcontroller.logout);

module.exports = routs;