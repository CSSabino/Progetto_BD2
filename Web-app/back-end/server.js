require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// instance of app
const app = express()

// import routes
const smartphoneRoutes = require('./routes/smartphone')
const userRoutes = require('./routes/user')
const smartphoneOperationsRoutes = require('./routes/smartphoneOperations')
const userOperationsRoutes = require('./routes/userOperations')

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Connect to DB & listening on port " + process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// use req.body
app.use(express.json())

// middleware used to log the request method and request path
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/user', userRoutes)
app.use('/api/userOperations', userOperationsRoutes)
app.use('/api/smartphoneOperations', smartphoneOperationsRoutes)
app.use('/api/smartphone', smartphoneRoutes)