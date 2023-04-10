// const mongoose = require('mongoose')
import mongoose from 'mongoose'

// const TextMessage = new mongoose.Schema({
//     senderType: {type: 'admin' || 'customer', required: true},
//     senderReference: {type: String, required: true, unique: true},
//     receiver: {type: String, required: true},
//     receiverType: {type: 'admin' || 'customer', required: true},
//     contentType: {type: 'text' || 'option', required: true},
//     content: {type: 'String', required: true},
//     timeStamp: {type: TimeRanges, required: true},
// },
// {collection: 'text-message'}
// ) 

const TextMessage = new mongoose.Schema({
    ownerId: {type: String, required: true},
    receiverId: {type: String, required: true},
    contentType: {type: String, required: true},
    content: {type: String, required: true},
    timeStamp: {type: Date, required: true},
},
{collection: 'text-message'}
)

const model = mongoose.model('text-message', TextMessage)

module.exports = model