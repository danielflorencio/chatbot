// const mongoose = require('mongoose')

const TextMessage = new mongoose.Schema({
    senderType: {type: 'admin' || 'customer', required: true},
    senderReference: {type: String, required: true, unique: true},
    receiver: {type: String, required: true},
    receiverType: {type: 'admin' || 'customer', required: true},
    contentType: {type: 'text' || 'option', required: true},
    content: {type: 'String', required: true},
    timeStamp: {type: TimeRanges, required: true},
},
{collection: 'text-message'}
) 

// const model = mongoose.model('text-message', TextMessage)

module.exports = model