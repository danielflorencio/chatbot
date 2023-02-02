import express, {Request, Response} from 'express';
const app = express();
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:2701')

app.post('/api/register', (req: Request, res: Response) => {
    console.log("request body: ", req.body)
    res.json({status: 'ok'})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})