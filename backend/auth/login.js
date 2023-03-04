const express = require('express');
const router = express.Router();

// mongodb user model
const User = require("../models/User");

// password handler
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');

const JWT_KEY = "secret";

// signIn
router.post('/login', (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: "Empty credentials supplied"
        })
    } else {
        User.find({ email })
            .then((data) => {
                if (data.length) {
                    // check if user is verified
                    if(!data[0].verified) {
                        res.json({
                            status: "FAILED",
                            message: "Email hasn't been verified yet. Check your inbox.",
                        })
                    } else {
                        const hashedPassword = data[0].password;
                        bcrypt
                            .compare(password, hashedPassword)
                            .then((result) => {
                                if (result) {
                                    const token = jwt.sign({
                                        email: data[0].email,
                                    },
                                    JWT_KEY,
                                    {
                                        expiresIn: "1h"
                                    });
                                    res.json({
                                        status: "SUCCESS",
                                        message: "SignIn successful",
                                        data: data,
                                        token: token
                                    })
                                } else {
                                    res.status(400).json(err);
                                    res.json({
                                        status: "FAILED",
                                        message: "Invalid password entered!"
                                    })
                                }
                            })
                            .catch(err => {
                                res.json({
                                    status: "FAILED",
                                    message: "An error occurred while comparing password"
                                })
                            })
                    }
                } else {
                    res.status(400).json(err);
                    res.json({
                        status: "FAILED",
                        message: "Invalid credentials entered!"
                    })
                }
            })
            .catch(err => {
                res.json({
                    status: "FAILED",
                    message: "An error occurred while cheking for exitsing user"
                })
            })
    }
})

module.exports = router;