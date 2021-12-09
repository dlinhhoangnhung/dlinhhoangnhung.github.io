class AppError extends Error {
    constructer(message, statusCode) {
        super.message()
        
        this.statusCode = statusCode
        this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperation = true

        Error.captureStackTrace(this, this.constructer)
    }
}

module.exports = AppError
