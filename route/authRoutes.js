const { registerUserController, loginUserController, forgetPaaswordController, resetPasswordController } = require("../controller/authController")
const user = require("./../models/User")
const router = require("express").Router()

router
    .post("/register", registerUserController)
    .post("/login", loginUserController)
    .post("/forget-password", forgetPaaswordController)
    .post("/reset-password", resetPasswordController)
    .delete("/destroy", async (req, res) => {
        await user.deleteMany()
        {
            res.json({
                success: true
            })
        }
    })
module.exports = router