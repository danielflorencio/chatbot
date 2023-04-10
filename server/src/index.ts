import express, {Request, Response} from 'express';
import { Server, Socket } from 'socket.io'
import { createServer } from 'http'
import { Conversations } from './data/Conversations';
import models from './models/models';

const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')
// const User = require('./models/user.model')
const User = models.User
const Conversation = models.Conversation;
const Message = models.Message;
const Customer = models.Customer;
const jwt = require('jsonwebtoken') 
// const { Server} = require('socket.io')

const app = express();
const socketIoHttpServer = createServer(app)

app.use(cors())
app.use(express.json())

const server = createServer(app)

mongoose.connect('mongodb://localhost:27017/chatbot-application')

const io = new Server(socketIoHttpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket: Socket) => {
    console.log('connection made: ', socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected. Id: ", socket.id)
    })

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log('Socket.id sending data: ', socket.id   )
        console.log('Data received on join_room event: ', data)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
})

app.post('/api/verifyStatus', async (req: Request, res: Response) => {
    try{
        const decodedToken = await jwt.decode(req.body.token)
        const user = await User.findOne({
            token: decodedToken
        })
        if(user){
            res.json({status: 'ok', token: decodedToken, userEmail: user.email})
        } else {
            res.json({status: 'error', error: 'User not found'})
        }
    }catch(error){
        res.json({status: 'error', error: 'Could not decode the token.'})
    }    
})

app.post('/api/register', async (req: Request, res: Response) => {
    try{
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
        res.json({status: 'ok'})
    }catch(error){
        res.json({status: 'error', error: 'Duplicate email'})
    }    
})

app.post('/api/login', async (req: Request, res: Response) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (user) {
        const token = jwt.sign({
            name: user.firstName,
            email: user.email
        },'secretPass')
    
        return res.json({status: 'ok', user: token})
    } else{
        return res.json({status: 'error', user: false})
    }
})

app.post('/api/sendMessage', async (req, res) => {

    try{
        await Message.create({
            content: req.body.content,
            senderReference: req.body.senderReference,
            recipientReference: req.body.recipientReference,
            senderType: req.body.senderType,
            date: req.body.date,
        })
        console.log('Message gone to the database: ', Message)
        res.json({status: 'ok'})
    }catch(error){
        res.json({status: 'error', error: "Wasn't able to save message to the database."})
    }
    // const { content, senderReference, recipientReference, senderType, date } = req.body;
    // try {
    //     const message = new Message({ content, senderReference, recipientReference, senderType, date });
    //     await message.save();
    //     res.status(200).json(message);
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).send('Error saving message');
    // }
});

app.get('/api/getAllMessages', async (req, res) => { // This API Endpoint must be called as soon as the user is correctly authenticated and must load the user's messages with customers.
    try {
        const query = req.body.userEmail
        const messages = await Message.find(); // Here goes the query.
        res.status(200).json(messages);
    } catch (err) {
        console.log(err);
        res.status(500).send('Error getting messages');
    }
});

app.get('api/getOneChatMessages', async (req, res) => { // This API Endpoint must be called when a user scrolls top to the current chat and new messages must be loaded in a single chat.
    try{


        res.status(200).json({status: 'ok'});
    }catch(error){

        res.status(500).json({status: 'error'})
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

socketIoHttpServer.listen(3001)

async function createConversationAndMessage() {
  
    try{
        for(let i = 0; i < Conversations.length; i++){

            const user = await User.findOne({
                email: Conversations[i].adminId
            })

            // let messages = Conversations[i].messages;

            let messagesData;
            let messagesSchema;
            let messagesIds;

            if(user){
                const customer = await Customer.findOne({
                    phoneNumber: Conversations[i].customerId
                })
                if(customer){
                    for(let n = 0; n < Conversations[i].messages.length; n++){
                        messagesData[n] = Conversations[i].messages[n]
                        if (messagesData[n].senderType === 'admin'){
                            messagesSchema = await Message.create({
                                content: messagesData[n].content,
                                senderReference: user.id,
                                recipientReference: messagesData[n].customer.Id,
                                senderType: messagesData[n].senderType,
                                date: messagesData[n].date,
                            })
                        } else if(messagesData[n].senderType === 'customer'){
                            messagesSchema = await Message.create({
                                content: messagesData[n].content,
                                senderReference: messagesData[n].customer.id,
                                recipientReference: user.id,
                                senderType: messagesData[n].senderType,
                                date: messagesData[n].date,
                            })
                            messagesIds[n] = messagesSchema.id
                        } else{
                            console.log('error: messagesData[n].senderType !== admin or customer.')
                        }
                    }
                    const conversation = await Conversation.create({
                        messages: messagesIds,
                        adminId: user.id,
                        customerId: customer.id
                    })
                    await conversation.save();
                } else{
                    console.log('customer does not exist.')
                }
            } else {
                console.log('user not found.')
            }


        //    await conversation.save();
        }
    }catch(error){
        console.log('Error: ', error)
    }
  }
  
// createConversationAndMessage();