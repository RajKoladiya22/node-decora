const registertbl = require('../model/form');
const nodemailer = require('nodemailer');
const cookie = require('cookie-parser');
const passport = require('passport');

const index = (req, res) => {
    return res.render('index')
}

const register = (req, res) => {
    return res.render('register')
}

const registerdata = async (req, res) => {
    const { fname, lname, gender, email, password, cpassword, contact, address, state, zipcode } = req.body;
    if (password == cpassword) {
        try {
            let obj = {
                fname: fname,
                lname: lname,
                gender: gender,
                email: email,
                password: password,
                contact: contact,
                address: address,
                state: state,
                zipcode: zipcode
            }
            res.cookie('userdata', obj);
            if (obj) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'decora.evnt@gmail.com',
                        pass: 'goyu fzeg uxml ybal  '
                    }
                });
                let otp = Math.floor(Math.random() * 100000);
                var mailOptions = {
                    from: 'decora.evnt@gmail.com',
                    to: email,
                    subject: 'Sending Email using Node.js',
                    text: 'Your otp :- ' + otp
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        let obj = {
                            email: email,
                            otp: otp
                        }
                        console.log('Email sent: ' + info.response);
                        res.cookie('usercode', obj);
                        return res.redirect('/otpcode');
                    }
                });
            }
            else {
                console.log("Data is not fetched");
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    else {
        req.flash('error', 'password and confirm password is not same');
        return res.redirect('back')
    }
}

const otpcode = (req, res) => {
    return res.render('otpcode');
}

const userRegister = async (req, res) => {
    try {
        let userdata = req.cookies['userdata'];
        let email = req.cookies['usercode'].email;
        let code = req.cookies['usercode'].otp;
        console.log(userdata.email);
        if (userdata.email == email) {
            if (code == req.body.otpcode) {
                let data = await registertbl.create({
                    fname: userdata.fname,
                    lname: userdata.lname,
                    gender: userdata.gender,
                    email: userdata.email,
                    password: userdata.password,
                    contact: userdata.contact,
                    state: userdata.state,
                    address: userdata.address,
                    zipcode: userdata.zipcode,
                    role: 'user'
                })
                res.clearCookie('usercode');
                res.clearCookie('userdata');
                return res.redirect('/')
            } else {
                console.log("Otp is not Right");
                return res.redirect('back');
            }
        }
        else {
            console.log("Email is not Right");
            return res.redirect('back')
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const login = (req, res) => {
    if (res.locals.users) {
        return res.redirect('index');
    }
    return res.render('login')
}

const logindata = (req, res) => {
    return res.redirect('/index');
}

const forgetpassword = (req, res) => {
    return res.render('forget-password')
}

const fpassword = async (req, res) => {
    try {
        let record = await registertbl.findOne({ email: req.body.email });
        if (record) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'decora.evnt@gmail.com',
                    pass: 'wmmn btto xcms olbx'
                }
            });
            let otp = Math.floor(Math.random() * 100000);
            var mailOptions = {
                from: 'decora.evnt@gmail.com',
                to: req.body.email,
                subject: 'Sending Email using Node.js',
                text: 'Your otp :- ' + otp
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    let obj = {
                        email: req.body.email,
                        otp: otp
                    }
                    console.log('Email sent: ' + info.response);
                    res.cookie('forgetpassword', obj)
                    return res.redirect('/otp')
                }
            });

        } else {
            console.log('mail not found');
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const otp = (req, res) => {
    return res.render('otp');
}

const otpdata = (req, res) => {
    let cookieotp = req.cookies['forgetpassword'].otp;
    let otp = req.body.otp;
    if (cookieotp == otp) {
        return res.redirect('/resetpassword');
    } else {
        return res.redirect('back');
    }
}

const resetpassword = (req, res) => {
    return res.render('reset-password');
}

const npassword = async (req, res) => {
    const { password, cpassword } = req.body;
    if (password == cpassword) {
        try {
            let email = req.cookies['forgetpassword'].email;
            const updateEmail = await registertbl.findOne({ email: email })
            let id = updateEmail.id;
            const updatepass = await registertbl.findByIdAndUpdate(id, {
                password: password
            })
            if (updatepass) {
                res.clearCookie('forgetpassword');
                return res.redirect('/')
            }
            else {
                console.log("Password not changed");
                return res.redirect('back')
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    else {
        console.log("password and confirm password is not same");
        return res.redirect('back')
    }

}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false;
        }
        return res.redirect('/');
    })
}

module.exports = {
    index,
    register,
    registerdata,
    otpcode,
    userRegister,
    login,
    logindata,
    forgetpassword,
    fpassword,
    otp,
    otpdata,
    resetpassword,
    npassword,
    logout
}