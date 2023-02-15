import express, {Request, Response} from 'express';
const app = express();
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken') 
const { Server } = require('socket.io')
const http = require('http')

app.use(cors())
app.use(express.json())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        method: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(socket.id);


    socket.on("disconnect", () => {
        console.log("User disconnected. Id: ", socket.id)
    })

})





mongoose.connect('mongodb://localhost:27017/chatbot-application')

app.post('/api/verifyStatus', async (req: Request, res: Response) => {
    console.log("verifyStatus request body: ", req.body)
    try{
        const decodedToken = await jwt.decode(req.body.token)
        const user = await User.findOne({
            token: decodedToken
        })
        res.json({status: 'ok', token: decodedToken, userEmail: user.email})
    }catch(error){
        res.json({status: 'error', error: 'Could not decode the token.'})
    }    
})

app.post('/api/register', async (req: Request, res: Response) => {
    console.log("register request body: ", req.body)
    try{
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
        console.log("Try Create one being called.")
        console.log("User created: ", User)
        res.json({status: 'ok'})
    }catch(error){
        res.json({status: 'error', error: 'Duplicate email'})
    }    
})

app.post('/api/login', async (req: Request, res: Response) => {
    console.log("login request body: ", req.body)
    
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})