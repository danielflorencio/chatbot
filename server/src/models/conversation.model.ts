// const mongoose = require('mongoose')

const Conversation = new mongoose.Schema({
    ownerId: {type: String, required: true},
    receiver: {type: String, required: true},
},
{collection: 'conversations'}
) 

// const model = mongoose.model('text-message', TextMessage)

module.exports = model