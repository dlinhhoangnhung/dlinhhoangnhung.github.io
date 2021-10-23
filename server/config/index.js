require("dotenv").config()

module.exports = {
    URI: process.env.ATLAS_URI,
    SECRET: process.env.SECRET,
    PORT: process.env.PORT || 5001,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ACC_ACTIVATE: process.env.JWT_ACC_ACTIVATE,
    RESET_PASSWORD_KEY: process.env.RESET_PASSWORD_KEY,
    CLIENT_URL: process.env.CLIENT_URL,
}