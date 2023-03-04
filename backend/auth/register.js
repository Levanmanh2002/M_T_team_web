const express = require('express');
const router = express.Router();

// mongodb user model
const User = require("../models/User");

// env variables
require('dotenv').config();

// password handler
const bcrypt = require("bcrypt");

// email handler
const nodemailer = require("nodemailer");

// unique string
const { v4: uuidv4 } = require('uuid');

// path for static verified page
constpath = require("path");

// images
const multer = require('multer');

// mongodb user otp verification model
const UserOTPVerification = require("./../models/UserOTPVerification");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});

// testing success
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready for messages");
        console.log(success);
    }
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === ['jpeg', 'jpg', 'png']) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// signUp
router.post('/register', upload.single('image'), upload.single('backgroundImage'), (req, res) => {
    let { name, email, phone, password, dateOfBirth, sex } = req.body;
    let image = '';
    let backgroundImage = '';

    if (req.file) {
        image = req.file.path;
        backgroundImage = req.file.path;
    } else if (!req.file) {
        image = 'https://i.stack.imgur.com/l60Hf.png';
        backgroundImage = 'https://i.stack.imgur.com/l60Hf.png';
    }
    name = name.trim();
    email = email.trim();
    phone = phone.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();
    sex = sex;

    if (name == "" || email == "" || phone == "" || password == "" || dateOfBirth == "" || sex == "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    } else if (name.length >= 20) {
        res.json({
            status: "FAILED",
            message: "Invalid name enterend"
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: "FAILED",
            message: "Invalid email enterend"
        })
    } else if (phone.length < 10) {
        res.json({
            status: "FAILED",
            message: "Phone number must have 10 digits!"
        })
    } else if (!new Date(dateOfBirth).getTime()) {
        res.json({
            status: "FAILED",
            message: "Invalid date of birth enterend"
        })
    } else if (password.length < 8) {
        res.json({
            status: "FAILED",
            message: "Password is too short!"
        })
    } else {
        // checking if user already exists
        User.find({ email }).then(result => {
            if (result.length) {
                // a user already exists
                res.json({
                    code: 400,
                    status: "FAILED",
                    message: "User with the provided email already exists"
                })
            } else {
                // password handling
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        image,
                        backgroundImage,
                        name,
                        email,
                        phone,
                        password: hashedPassword,
                        dateOfBirth,
                        sex,
                        verified: false,
                    });
                    newUser
                        .save()
                        .then((result) => {
                            sendOTPVerificationEmail(result, res);
                        })
                        .catch(err => {
                            res.status(400).json(err);
                            res.json({
                                status: "FAILED",
                                message: "An error occurred while saving user account!"
                            })
                        })
                })
                    .catch(err => {
                        res.status(400).json(err);
                        res.json({
                            status: "FAILED",
                            message: "An error occurred while hashing password!"
                        })
                    })
            }
        }).catch(err => {
            console.log(err);
            res.status(400).json(err);
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user!"
            })
        })
    }
})

// send otp verification email
const sendOTPVerificationEmail = async ({ _id, email }, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

        // mail options
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the signup process.</p><p>This code <b>expires in 1 hour</b>.</p>`,
        }
        // hash the otp
        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const newOTPVerification = new UserOTPVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });

        // save otp record
        await newOTPVerification.save();
        transporter.sendMail(mailOptions);
        res.json({
            status: "PENDING",
            message: "Verification otp email sent",
            date: {
                userId: _id,
                email,
            },
        });
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
};

// verify otp email
router.post('/verifyOTP', async (req, res) => {
    try {
        let { userId, otp } = req.body;
        if (!userId || !otp) {
            throw Error("Empty otp details are not allowed");
        } else {
            const UserOTPVerificationRecords = await UserOTPVerification.find({
                userId,
            });
            if (UserOTPVerificationRecords.length <= 0) {
                // no record found
                throw new Error("Account record doesn't exist or has been verified already. Please sign up or log in.");
            } else {
                // user otp record exists
                const { expiresAt } = UserOTPVerificationRecords[0];
                const hashedOTP = UserOTPVerificationRecords[0].otp;

                if (expiresAt < Date.now()) {
                    // user otp record has expired
                    await UserOTPVerification.deleteMany({ userId });
                    throw new Error("Code has expired. Please request again.");
                } else {
                    const valiOTP = bcrypt.compare(otp, hashedOTP);
                    if (!valiOTP) {
                        // supplied otp is wrong
                        throw new Error("Invalid code passed. Check your inbox.");
                    } else {
                        // success
                        await User.updateOne({ _id: userId }, { verified: true });
                        await UserOTPVerification.deleteMany({ userId });
                        res.json({
                            status: "VERIFIED",
                            message: "User email verified successfully.",
                        });
                    }
                }
            }
        }
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
});

// resend verification
router.post('/resendOTPVerificationCode', async (req, res) => {
    try {
        let { userId, email } = req.body;

        if (!userId || !email) {
            throw Error("Empty user details are not allowed");
        } else {
            // delete axisting records and resend
            await UserOTPVerification.deleteMany({ userId });
            sendOTPVerificationEmail({ _id: userId, email }, res);
        }
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
});


module.exports = router;
