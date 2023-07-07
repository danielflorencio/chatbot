// import express, {Request, Response} from 'express';
// import { Server, Socket } from 'socket.io'
// import { createServer } from 'http'
// import { Conversations } from './data/Conversations';
// import models from './models/models';
// import { authenticateToken } from './authMiddleware';

const port = 3000
const { app } = require('./app')
app.listen(port, () => {
    console.log('Listening on port ', port)
})

// const cors = require('cors')
const mongoose = require('mongoose')
// const User = models.User
// const Conversation = models.Conversation;
// const Message = models.Message;
// const Customer = models.Customer;
// const jwt = require('jsonwebtoken') 
// const rateLimit = require('express-rate-limit')
// // const { Server} = require('socket.io')

// const app = express();
// const socketIoHttpServer = createServer(app)

// app.use(cors())
// app.use(express.json())

// const server = createServer(app)

mongoose.connect('mongodb://localhost:27017/chatbot-application')

// const io = new Server(socketIoHttpServer, {
//     cors: {
//         origin: 'http://localhost:5173',
//         methods: ["GET", "POST"]
//     }
// })

// io.on("connection", (socket: Socket) => {
//     console.log('connection made: ', socket.id);

//     socket.on("disconnect", () => {
//         console.log("User disconnected. Id: ", socket.id)
//     })

//     socket.on("join_room", (data) => {
//         socket.join(data);
//         console.log('Socket.id sending data: ', socket.id   )
//         console.log('Data received on join_room event: ', data)
//     })

//     socket.on("send_message", (data) => {
//         socket.to(data.room).emit("receive_message", data);
//     });

//     socket.on("disconnect", () => {
//         console.log("User Disconnected", socket.id);
//     });
// })

// const verifyStatusRateLimit = rateLimit({
//     // windowMs: 15 * 60 * 1000, 
//     // max: 10
// })

// app.post('/api/verifyStatus', async (req: Request, res: Response) => {
//     try{
//         const decodedToken = await jwt.decode( req.body.token, 'secretPass')
//         const userEmail = decodedToken.email
//         const user = await User.findOne({
//             email: userEmail
//         })
//         console.log('user found: ', user)
//         if(user){
//             res.json({status: 'ok', token: decodedToken, userEmail: user.email})
//         } else {
//             res.json({status: 'error', error: 'User not found'})
//         }
//     }catch(error){
//         res.json({status: 'error', error: 'Could not decode the token.'})
//     }    
// })

// const registerRateLimit = rateLimit({
//     // windowMs: 60 * 60 * 1000,
//     // max: 3
// })

// app.post('/api/register', registerRateLimit, async (req: Request, res: Response) => {
//     try{
//         await User.create({
//             firstName: req.body.firstName,
//             lastName: req.body.lastName,
//             email: req.body.email,
//             password: req.body.password
//         })
//         res.json({status: 'ok'})
//     }catch(error){
//         res.json({status: 'error', error: 'Duplicate email'})
//     }    
// })

// const loginRateLimit = rateLimit({
//     // windowMs: 20 * 60 * 1000, 
//     // max: 12
// })

// app.post('/api/login', async (req: Request, res: Response) => {
//     const user = await User.findOne({
//         email: req.body.email,
//         password: req.body.password
//     })
//     console.log('USER FIRST INTERACTION: ', user)
//     if (user) {
//         const token = jwt.sign({
//             name: user.firstName,
//             email: user.email
//         },'secretPass')
    
//         user.token = token
//         await user.save()
//         console.log('USER SECOND INTERACTION: ', user)
//         return res.json({status: 'ok', user: token})
//     } else{
//         return res.json({status: 'error', user: false})
//     }
// })

// const newMessageRateLimit = rateLimit({
//     // windowMs: 30 * 60 * 1000,
//     // max: 18
// })

// app.post('/api/messages', authenticateToken, async (req, res) => {
//     try{
//         const user = await User.findOne({
//             email: req.body.adminReference
//         })
//         const customer = await Customer.findOne({
//             phoneNumber: req.body.customerReference
//         })
//         try{
//             const newMessage = await Message.create({
//                 content: req.body.content,
//                 senderType: req.body.senderType,
//                 adminReference: user?.id,
//                 customerReference: customer?.id,
//                 date: req.body.date
//             })
//             try{
//                 const newConversation = await Conversation.findOneAndUpdate(
//                     {adminId: user?._id, customerId: customer?._id}, 
//                     { $push: { messages: newMessage._id } })
//             } catch(error){
//                 res.json({status: 'error', message: 'error when updating the conversation.'})
//             }
//             res.json({status: 'ok', message: 'message created.'})
//         } catch(error){
//             console.log('ERROR: ', error)
//             res.json({status: 'Error', message: error})
//         }
//     } catch(error){
//         console.log('ERROR: ', error)
//         res.json({status: 'error'})
//     }
// });

// const getMessagesRateLimit = rateLimit({
//     // windowMs: 15 * 60 * 1000,
//     // max: 20
// })

// app.get('/api/messages', authenticateToken, async (req: Request, res: Response) => {
//     console.log('Get messages endpoint being hit.')
//     console.log('GET REQUEST BEING MADE BY THE CLIENT: ', req)
//     try{
//         const user = await User.findOne({email: req.query.email})
//         if(user){
//             const conversationsIndexes = await Conversation.find({adminId: user._id})
//             const customerIds = conversationsIndexes.map((conversationIndex) => conversationIndex.customerId)
//             let response = await Promise.all(conversationsIndexes.map(async (conversation, index) => ({
//                 messages: await Message.find({ adminReference: user._id, customerReference: customerIds[index]}),
//                 adminId: req.query.email,
//                 customerId: await Customer.findOne({ _id: customerIds[index]}).select({phoneNumber: 1, _id: 0})
//             })))
//             console.log('RESPONSE FORMAT: ', response)
//             res.status(200).json({status: 'ok', conversations: response});
//         }
//     }catch(error){
//         res.status(500).json({status: 'error'})
//     }
// })

// const newConversationRateLimit = rateLimit({
//     // windowMs: 45 * 60 * 1000,
//     // max: 10
// })

// app.post('/api/newConversation', authenticateToken, async (req: Request, res: Response) => {
//     try{
//         const user = await User.findOne({
//             email: req.body.adminReference
//         })
//         if(user){
//             const customer = await Customer.create({
//                 phoneNumber: req.body.newConversationPhoneNumber
//             })
//             try{
//                 const conversation = await Conversation.create({
//                     messages: [],
//                     adminId: user._id,
//                     customerId: customer._id        
//                 })
//                 res.status(200).json({status: 'ok'})
//             }catch{
//                 res.status(500).json({status: 'error', message: 'error while creating customer/conversation'})
//             }
//         }
//     }catch(error){
//         res.status(500).json({status: 'error', message: 'internal server error.'})
//     }
// })

// app.listen(port, () => {
//     console.log(`Listening on port ${port}`)
// })

// socketIoHttpServer.listen(3001)