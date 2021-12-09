const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const { success, error } = require('consola')
const passport = require('passport')

const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/user.model')
const { SECRETT } = require('./config/index')
const globalErrorHandler = require('./controllers/errorController')
const AppError = require('./utils/appError')

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
app.use(passport.session());
require('./middlewares/passport')(passport)



// OK
mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => success({
    message: `Successffully connected with the DB`,
    badge: true
}))
    .catch((err) => error({
        message: `Unable to connect with the DB \n${err}`,
        badge: false
    }))


app.listen(PORT, () =>
    success({ message: `Server start on PORT ${PORT}`, badge: true })
)

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.get('/i', function (req, res) {
    res.locals.user = 'GeeksforGeeks';
    console.log(res.locals);
    res.end();
});

// app.use(async (req, res, next) => {
//     if (req.headers["Authorization"]) {
//         const accessToken = req.headers["Authorization"];
//         //  const { user_id, expiresIn } = await jwt.verify(accessToken, SECRETT);
//         const { user_id, expiresIn } = await ExtractJwt.fromAuthHeaderAsBearerToken(accessToken, SECRETT)
//         // Check if token has expired
//         if (expiresIn < Date.now().valueOf() / 1000) {
//             return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
//         }
//         res.locals.loggedInUser = await User.findById(user_id); next();
//         console.log(res.locals.loggedInUser)
//     } else {
//         next();
//     }
// });

const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')
const categoriesRouter = require('./routes/categories')
const ordersRouter = require('./routes/orders')
const customerRouter = require('./routes/customers')
const ordersdetailRouter = require('./routes/orders-detail')
// const { AppsSharp } = require('@material-ui/icons')
const { connect } = require('./routes/users')
const imagesRouter = require('./routes/product-images')
const colorsRouter = require('./routes/product-colors')
const sizesRouter = require('./routes/product-sizes')


//User router middleware
app.use('/users', usersRouter)
app.use('/users/api/products', productsRouter)
app.use('/users/api/categories', categoriesRouter)
app.use('/users/api/orders', ordersRouter)
app.use('/users/api/customers', customerRouter)
app.use('/users/api/orders-detail', ordersdetailRouter)
app.use('/users/api/products-image', imagesRouter)
app.use('/users/api/products-sizes', sizesRouter)
app.use('/users/api/products-colors', colorsRouter)


app.all('*', (req, res, next) => {
    return next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404))
})

// app.use(globalErrorHandler)
app.use(bodyparser.urlencoded({ extended: true }));

module.exports = app