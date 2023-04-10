// import mongoose, { Schema } from 'mongoose';

// const messageSchema = new Schema({
//   content: { type: String, required: true },
//   senderReference: String,
//   recipientReference: String,
//   senderType: { type: String, required: true },
//   date: { type: Date, default: Date.now }
// });

// const conversationSchema = new Schema({
//   messages: [messageSchema],
//   adminId: { type: String, required: true },
//   customerId: { type: String, required: true },
//   conversationId: { type: String, required: true, unique: true }
// });

// const ConversationModel = mongoose.model('Conversation', conversationSchema);
// const Message = mongoose.model('textMessage', messageSchema)

// module.exports = model