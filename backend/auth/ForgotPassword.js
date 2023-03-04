const express = require('express');
const router = express.Router();

// mongodb user model
const User = require("../models/User");

const PasswordReset = require("./../models/PasswordReset");

// env variables
require('dotenv').config();

// path for static verified page
constpath = require("path");

// email handler
const nodemailer = require("nodemailer");

// unique string
const { v4: uuidv4 } = require('uuid');

const bcrypt = require('bcrypt');

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});

// send password reset email
const sendResetEmail = ({_id, email}, redirectUrl, res) => {
    const resetString = uuidv4() + _id;

    // First, we clear all existing reset records
    PasswordReset
        .deleteMany({userId: _id})
        .then(result => {
            // reset records deleted seccessfully
            // now we send the email
            // mail options
            const mailOptions = {
                from: process.env.AUTH_EMAIL,
                to: email,
                subject: "Password Reset",
                html: `<p>We heard that you lost the password.</p> <p>Don't worry, use the link below to reset it.</p><p>This link <b>expires in 60 minutes</b>.</p><p>Press <a href=${redirectUrl + "/" + _id + "/" + resetString}>here</a> to proceed.</p>`,
            };

            // hash the reset string
            const saltRounds = 10;
            bcrypt
                .hash(redirectUrl, saltRounds)
                .then(hashedResetString => {
                    // set values in password reset collection
                    const newPasswordReset = new PasswordReset({
                        userId: _id,
                        resetString: hashedResetString,
                        createdAt: Date.now(),
                        expiresAt: Date.now() + 3600000
                    });
                    newPasswordReset
                        .save()
                        .then(() => {
                            transporter
                                .sendMail(mailOptions)
                                .then(() => {
                                    res.json({
                                        status: "PENDING",
                                        message: "Verification password sent",
                                    })
                                })
                                .catch((error) => {
                                    console.log(error);
                                    res.json({
                                        status: "FAILED",
                                        message: "Verification password failed!",
                                    })
                                })
                        })
                        .catch((error) => {
                            console.log(error);
                            res.json({
                                status: "FAILED",
                                message: "Couldn't save verification password data!",
                            })
                        })
                })
                .catch(() => {
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while hashing password data!",
                    })
                })
        })
        .catch((error) => {
            console.log(error);
                res.json({
                    status: "FAILED",
                    message: "An error data!",
                })
        })
}


router.post('/requestPasswordReset', (req, res) => {
    const {email, redirectUrl} = req.body;

    // check if email exists
    User
        .find({email})
        .then((data) => {
            if (data.length) {
                // user exists

                // check if user is verified
                if (!data[0].verified) {
                    res.json({
                        status: "FAILED",
                        message: "Email hasn't been verified yet. Check your inbox",
                    });
                } else {
                    // proceed with email to reset password
                    sendResetEmail(data[0], redirectUrl, res);
                }
            } else {
                res.json({
                    status: "FAILED",
                    message: "No account with the supplied email exists!",
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.json({
                status: "FAILED",
                message: "An erroe occurred while checking for existing user",
            });
        })
})

// actually reset the password
router.post('/resetPassword', (req, res) => {
    let {userId, resetString, newPassword} = req.body;

    PasswordReset
        .find({userId})
        .then(result => {
            if(result.length > 0 ) {
                // password reset record exists so we proceed
                const {expiresAt} = result[0];
                const hashedResetString = result[0].resetString;
                // cheking for expired reset string
                if(expiresAt < Date.now()) {
                    PasswordReset
                        .deleteOne({userId})
                        .then(() => {
                            // reset record deleted seccessfully
                            res.json({
                                status: "FAILED",
                                message: "Password reset link has expired.",
                            })
                        })
                        .catch(error => {
                            // deleted failed
                            console.log(error);
                            res.json({
                                status: "FAILED",
                                message: "Clearing password reset record failed.",
                            });
                        })
                } else {
                    // valid reset record exists so we vailidate the reset string
                    // first compare the hashed reset string

                    bcrypt
                        .compare(resetString, hashedResetString)
                        .then((result) => {
                            if(result) {
                                // string matched
                                // had password again

                                const saltRounds = 10;
                                bcrypt
                                    .hash(newPassword, saltRounds)
                                    .then(hashedNewPassword => {
                                        // update user password
                                        User
                                            .updateOne({_id: userId}, {password: hashedNewPassword})
                                            .then(() => {
                                                // update complete. Now delete reset record
                                                PasswordReset
                                                    .deleteOne({userId})
                                                    .then(() => {
                                                        // both user record and reset record updated
                                                        res.json({
                                                            status: "SUCCESS",
                                                            message: "Password has been reset successfully."
                                                        })
                                                    })
                                                    .catch(error => {
                                                        console.log(error);
                                                        res.json({
                                                            status: "FAILED",
                                                            message: "An error occurred while fializing password reset."
                                                        })
                                                    })
                                            })
                                            .catch(error => {
                                                console.log(error);
                                                res.json({
                                                    status: "FAILED",
                                                    message: "Updating user password failed."
                                                })
                                            })
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        res.json({
                                            status: "FAILED",
                                            message: "An eror occurred while hashing new password."
                                        })
                                    })
                            } else {
                                // existing record but incorrect reset string passed
                                res.json({
                                    status: "FAILED",
                                    message: "Invalid password reset details passed."
                                })
                            }
                        })
                        .catch(error => {
                            res.json({
                                status: "FAILED",
                                message: "Comparing password reset string failed."
                            })
                        })
                }
            } else {
                res.json({
                    status: "FAILED",
                    message: "Password reset request not found.",
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.json({
                status: "FAILED",
                message: "Checking for existing password reset record failder.",
            })
        })
})


module.exports = router;