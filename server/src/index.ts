import express, {Request, Response} from 'express';
const app = express();
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
 
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/chatbot-application')

app.post('/api/register', async (req: Request, res: Response) => {
    console.log("register request body: ", req.body)
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
    console.log("login request body: ", req.body)
    
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    
    if (user) {
        return res.json({status: 'ok', user: true})
    } else{
        return res.json({status: 'error', user: false})
    }
    
    
    
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})