const nodemailer = require("nodemailer")
exports.sendEmail = ({ sendTo, sub, txt }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            // type: "OAuth2",
            user: "pratikshakurkure850@gmail.com",
            pass: "bhqebociwzcxbvwj"
            // clientId: "1033451507175-ksg62pslufivu65vggt33r27542snafn.apps.googleusercontent.com",
            // clientSecret: "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",
            // accessToken: "",
            // refreshToken: ""
        }
    })//end

    transporter.sendMail({
        to: sendTo,
        from: "pratikshakurkure850@gmail.com",
        subject: sub,
        text: txt
    }, err => {
        if (err) {
            console.log(err)
        } else {

            console.log("EMAIL SEND SUCCESSFULLY");
        }
    })
}