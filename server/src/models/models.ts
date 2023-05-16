import mongoose, {Schema} from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
  token: {type: String, required: false}
}, {collection: 'user-data'}); 

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  customerReference: { type: Schema.Types.ObjectId, ref: 'Customer' },
  adminReference: { type: Schema.Types.ObjectId, ref: 'User' },
  senderType: { type: String, required: true },
  date: { type: Date, default: Date.now }
}, {collection: 'text-messages'});

const conversationSchema = new mongoose.Schema({
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  adminId: { type: Schema.Types.ObjectId, ref: 'User' },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' }
}, {collection: 'conversations'});

const customerSchema = new mongoose.Schema({
  phoneNumber: {type: String, required: true}
}, {collection: 'customers'})

const ConversationModel = mongoose.model('Conversation', conversationSchema);
const MessageModel = mongoose.model('textMessage', messageSchema)
const UserModel = mongoose.model('UserData', UserSchema)
const CustomerModel = mongoose.model('Customer', customerSchema);

const models = {
  User: UserModel,
  Conversation: ConversationModel,
  Message: MessageModel,
  Customer: CustomerModel
};
  
export default models;