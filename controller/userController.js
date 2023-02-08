const user = require("./../models/User")

exports.getAllUsers = async (req, res) => {
    try {
        // console.log(req.body);
        // const u = await user.findById(req.body.id)
        // if (!u.admin) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "You are a user not admin"
        //     })
        // }
        const result = await user
            .find()
        // .select("name email _id")
        res.json({
            success: true,
            message: "User fetched Successfully",
            result
        })
    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: "error" + error
        })
    }
}
exports.getUsersDetail = async (req, res) => {
    try {

        const result = await user
            .findById(req.body.id)
        res.json({
            success: true,
            message: "User Detail fetched Successfully",
            result
        })
    } catch (error) {
        res.status(400).json({
            sucess: false,
            message: "error" + error
        })
    }
}