const { getAllUsers, getUsersDetail } = require("../controller/userController")
const { protected, adminOnly } = require("../middleware/authMiddleware")
const router = require("express").Router()

router
    .get("/", adminOnly, getAllUsers)
    .get("/details", protected, getUsersDetail)
module.exports = router