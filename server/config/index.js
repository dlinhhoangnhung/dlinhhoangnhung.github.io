require("dotenv").config()

module.exports={
    URI : process.env.ATLAS_URI,
    SECRET: process.env.SECRET,
    PORT : process.env.PORT || 5001
}