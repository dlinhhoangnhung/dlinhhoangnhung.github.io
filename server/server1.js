const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const { success, error } = require('consola')
const passport = require('passport')

require('dotenv').config()

const { URI, PORT } = require("./config")

// const PORT = process.env.PORT || 5001
const SECRET = process.env.SECRET
// const URI = process.env.ATLAS_URI

//Init the application
const app = express()

//Middleware
app.use(cors())
app.use(express.json())
app.use(passport.initialize())

require('./middlewares/passport')(passport)
//Connect with DB
// const startApp = async () => {
//     try {
//         await connect(URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: true
//         })
//         success({
//             message: `Successffully connected with the DB \n${URI}`,
//             badge: true
//         })
//         app.listen(PORT, () =>
//             success({ message: `Server start on PORT ${PORT}`, badge: true })
//         )
//     } catch (err) {
//         error({
//             message: `Unable to connect with the DB \n${err}`,
//             badge: true
//         })
//         startApp()
//     }
// }



// OK
mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(() => success({
    message: `Successffully connected with the DB \n${URI}`,
    badge: true
})).catch((err) => error({
        message: `Unable to connect with the DB \n${err}`,
        badge: false
    }))

app.listen(PORT, () =>
    success({ message: `Server start on PORT ${PORT}`, badge: true })
)

// const connection = mongoose.connection
// connection.once('open', () => {
//     console.log("MongoDB database connection established successfully")
// })

const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')
const ordersRouter = require('./routes/orders')
const customerRouter = require('./routes/customers')
const ordersdetailRouter = require('./routes/orders-detail')
const { AppsSharp } = require('@material-ui/icons')
const { connect } = require('./routes/users')

//User router middleware
app.use('/users', usersRouter)
app.use('/users/api/products', productsRouter)
app.use('/users/api/categories', categoriesRouter)
app.use('/users/api/orders', ordersRouter)
app.use('/users/api/customers', customerRouter)
app.use('/users/api/orders-detail', ordersdetailRouter)

// startApp()