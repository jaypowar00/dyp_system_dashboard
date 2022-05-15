const express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
require('../models/StudentModel');
require('../models/AdminSessionModel')
const Users = mongoose.model('Users');
const AdminSession = mongoose.model('AdminSession');
const cors = require("cors");
const bcrypt = require('bcrypt');
require('dotenv').config();

router.get("/", cors(), function (request, response) {
    const {query} = request;
    const {
        s_class, 
        s_div,
        token
    } = query;
    if (!token) {
        return response.json({
            status: false,
            message: 'missing session token in request'
        })
    }
    if (!s_class || !s_div) {
        return response.json({
            status: false,
            message: 'missing required fields (s_class & s_div)'
        })
    }
    AdminSession.findOne({
        _id: token,
        isDeleted: false
    }, (err, doc) => {
        if (err) {
            console.log(err)
            return response.json({
                status: false,
                message: 'something went wrong! ('+err+')'
            })
        } else if (doc) {
            Users.find({
                class: s_class,
                division: s_div
            }, {
                password: 0,
                uploaded: 0,
                sharedWithMe: 0,
                isVerified: 0,
                verification_token: 0,
                _id: 0,
                reset_token: 0,
            }, {
                sort: {
                    rollno: 1
                }
            },(error, results) => {
                if (error) {
                    return response.json({
                        status: false,
                        message: 'something went wrong! ('+error+')'
                    })
                }else {
                    return response.json({
                        status: true,
                        users: results
                    })
                }
            }).catch(reason => {
                console.log(reason)
                return response.json({
                    status: false,
                    message: 'Something Went Wrong ('+reason+')'
                })
            })
        }else {
            return response.json({
                status: false,
                message: 'session expired'
            })
        }
    }).catch(err => {
        return response.json({
            status: false,
            message: 'Server Error ('+err.message+')'
        })
    })
})

router.get("/verify", cors(), function (request, response) {
    const {query} = request;
    const {
        token
    } = query;
    if (!token) {
        return response.json({
            status: false,
            message: 'missing session token in request'
        })
    }
    AdminSession.findOne({
        _id: token,
        isDeleted: false
    }, (err, doc) => {
        if (err) {
            console.log(err)
            return response.json({
                status: false,
                message: 'something went wrong! ('+err+')'
            })
        } else if (doc) {
            return response.json({
                status: true,
                message: 'valid session'
            })
        }else {
            return response.json({
                status: false,
                message: 'session expired'
            })
        }
    }).catch(err => {
        return response.json({
            status: false,
            message: 'Server Error ('+err.message+')'
        })
    })
})

router.post("/login", cors(), async function (request, response) {
    const { body } = request;
    const { email, password } = body;

    if (!email)
        return response.json({
            status: false,
            message: 'email field misisng in request'
        })
    if (!password)
        return response.json({
            status: false,
            message: 'password field misisng in request'
        })

    if (email != process.env.ADMIN_EMAIL) {
        return response.json({
            status: false,
            message: 'Email does not exist.'
        })
    }
    bcrypt.compare(password, process.env.ADMIN_PASSWORD, function (error, isVerify) {
        if (isVerify) {
            console.log('[+] login verified')
            let adminSession = new AdminSession();
            adminSession.timestamp = Date.now();
            adminSession.save((err, doc) => {
                if (err) {
                    return response.json({
                        status: false,
                        message: 'Error: Server Error ('+err+')'
                    })
                }
                else{
                    return response.json({
                        status: true,
                        sessionid: doc._id
                    })
                }
            });
        }else{
            return response.json({
                status: false,
                message: 'Password is not correct.'
            });
        }
    });
});
    
router.post("/logout", function (request, response) {
    const {body} = request
    const {token} = body
    if (!token)
        return response.json({
            status: false,
            message: 'missing session token in request'
        })
    AdminSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set: {
            isDeleted: true
        }
    }, null, (err, sessions) => {
        if (err)
            return response.json({
                status: false,
                message: 'Error: Server Error ('+err+')'
            })
        return response.json({
            status: true,
            message: 'Successfully logged out!'
        })
    })
});

module.exports = router;