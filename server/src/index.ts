const port = 3000
const { app } = require('./app')

app.listen(port, () => {
    console.log('Listening on port ', port)
})

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/chatbot-application')