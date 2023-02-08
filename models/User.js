const mongoose = require("mongoose")

module.exports = mongoose.model("user", mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    passwordResetAt: {
        type: Date
    },
    allowPasswordReset: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }))