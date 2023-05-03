import express, {Request, Response} from 'express';
import { Server, Socket } from 'socket.io'
import { createServer } from 'http'
import { Conversations } from './data/Conversations';
import models from './models/models';

const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')
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

app.post('/api/messages', async (req, res) => {
    // console.log('request being received on sendMessage API endpoint: ', req)
    console.log('req.body: ', req.body)
    console.log('req.params: ', req.params)
    console.log('req.query: ', req.query)
    try{
        const user = await User.findOne({
            email: req.body.adminReference
        })
        const customer = await Customer.findOne({
            phoneNumber: req.body.customerReference
        })
        console.log('user: ', user)
        console.log('customer: ', customer)
        /*
        // if(req.body.senderType === 'admin'){
        //     try{
        //         await Message.create({
        //             content: req.body.content,
        //             senderType: req.body.senderType,
        //             adminReference: user?.id,
        //             customerReference: customer?.id,
        //             date: req.body.date
        //         })
        //     } catch(error){
        //         console.log('ERROR: ', error)
        //     }
        // } else{
        //     try{
        //         await Message.create({
        //             content: req.body.content,
        //             senderType: req.body.senderType,
        //             adminReference: user?.id,
        //             customerReference: customer?.id,
        //             date: req.body.date
        //         })
        //     } catch(error){
        //         console.log('ERROR: ', error)
        //     }
        // }
        // res.json({status: 'ok'})
        */
        try{
            await Message.create({
                content: req.body.content,
                senderType: req.body.senderType,
                adminReference: user?.id,
                customerReference: customer?.id,
                date: req.body.date
            })
            res.json({status: 'ok', message: 'message created.'})
        } catch(error){
            console.log('ERROR: ', error)
            res.json({status: 'Error', message: error})
        }
    } catch(error){
        console.log('ERROR: ', error)
        res.json({status: 'error'})
    }
});

app.get('/api/messages', async (req, res) => { // This API Endpoint must be called when a user scrolls top to the current chat and new messages must be loaded in a single chat.
    try{

        const user = await User.findOne({email: req.query.email})
        
        if(user){
            const conversationsIndexes = await Conversation.find({adminId: user._id})     
            const customerIds = conversationsIndexes.map((conversationIndex) => conversationIndex.customerId)

            let response = await Promise.all(conversationsIndexes.map(async (conversation, index) => ({
                messages: await Message.find({ adminReference: user._id, customerReference: customerIds[index]}),
                adminId: req.query.email,
                customerId: await Customer.findOne({ _id: customerIds[index]}).select({phoneNumber: 1, _id: 0})
            })))

            // console.log('API/messages Response: ', response)
            res.status(200).json({status: 'ok', conversations: response});
        }
    }catch(error){
        res.status(500).json({status: 'error'})
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

socketIoHttpServer.listen(3001)

async function createConversationAndMessage() {
    try {
      for (let i = 0; i < Conversations.length; i++) {
        const user = await User.findOne({ email: Conversations[i].adminId });
        const customer = await Customer.create({ phoneNumber: Conversations[i].customerId });
  
        console.log('for loop being executed once.')

        if(user){
            const messagesData = Conversations[i].messages.map((message) => ({
                content: message.content,
                // senderReference: message.senderType === 'admin' ? user._id : customer._id,
                customerReference: customer._id,
                adminReference: user._id,
                senderType: message.senderType,
                date: message.date,
              }));
        
              const messages = await Conversation.insertMany(messagesData);
        
              const conversationData = {
                messages: messages.map((message) => message._id),
                adminId: user._id,
                customerId: customer._id,
              };
              await Conversation.create(conversationData);
        }

      }
    } catch (err) {
      console.error(err);
    } finally {
      mongoose.disconnect();
    }
}
// createConversationAndMessage();