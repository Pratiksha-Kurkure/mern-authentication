const user = require("./../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { sendEmail } = require("../utils/email")
const { addMinutes, isBefore } = require("date-fns")
const { findById } = require("./../models/User")
exports.registerUserController = async (req, res) => {
    try {
        const found = await user.findOne({ email: req.body.email })
        //below if for uniqe entry of email
        // if (found) {
        //     // throw "Email Already exists"
        //     return res.json({
        //         success: false,
        //         message: "Email Already Exist"
        //     })
        // }
        const hashPass = bcrypt.hashSync(req.body.password)
        const result = await user.create({
            ...req.body,
            password: hashPass,
            admn: false
        })
        // to login user at the same time
        const token = jwt.sign({ id: result._id }, process.env.JWT_KEY)




        //function of shooting mail is called below
        sendEmail(
            {
                sendTo: req.body.email,
                sub: "Subject for mail2",
                txt: "Main text of mail2"
            }
        )

        res.json({
            success: true,
            message: "User Register and login successfully",
            result: {
                id: result._id,
                name: result.name,
                email: result.email,
                active: result.active,
                admin: result.admin,
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error" + error
        })
    }
}
exports.loginUserController = async (req, res) => {
    try {
        const result = await user.findOne({ email: req.body.email })
        if (!result) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email"
            })
        }
        const match = await bcrypt.compare(req.body.password, result.password)
        if (!match) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }
        const token = jwt.sign({ id: result._id }, process.env.JWT_KEY)
        res.json({
            success: true,
            message: "User Logged In successfully",
            result: {
                id: result._id,
                name: result.name,
                email: result.email,
                active: result.active,
                admin: result.admin,
                token
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: " Login Error" + error
        })
    }
}
exports.forgetPaaswordController = async (req, res) => {
    try {
        const result = await user.findOne({ email: req.body.email })
        if (!result) {
            res.status(400).json({
                success: false,
                message: "You are not registered"
            })
        }
        //code use for expiring time of link
        await user.findByIdAndUpdate(result._id, {
            passwordResetAt: addMinutes(new Date(), 2),
            allowPasswordReset: true
        })

        sendEmail(
            {
                sendTo: req.body.email,
                sub: "Instruction For Forget Password with SKILLHUB",
                // txt: `http://127.0.0.1:5173/reset-password/${result._id}`
                txt: `https://vast-puce-rooster-kilt.cyclic.app/reset-password/${result._id}`
            }
        )
        res.json({
            success: true,
            message: "Instructions send to email"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "error" + error
        })
    }
}
exports.resetPasswordController = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.query);
        const { pass } = req.body
        const { userId } = req.query
        const record = await user.findById(userId)
        if (!record) {
            return res.status(400).json({
                message: "Invalid Link"
            })
        }
        if (isBefore(record.passwordResetAt, new Date())) {
            return res.status(400).json({
                success: false,
                message: "Link Expired"
            })
        }
        //checks if password reset or not
        if (!record.allowPasswordReset) {
            return res.status(400).json({
                success: false,
                success: "You have used this link previously"
            })
        }
        const hashPass = bcrypt.hashSync(pass)
        const result = await user.findByIdAndUpdate(userId, {
            password: hashPass,
            allowPasswordReset: false
        })

        if (!result) {
            return res.status(401).json({
                success: false,
                message: "Something went wrong"
            })
        }
        res.json({
            success: true,
            message: "Password Reset Successfully"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error" + error
        })
    }
}