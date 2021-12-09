module.exports = (err, req, res, next) => {
    // console.log(err.stack)

    err.statusCode = err.statusCode || 501
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}