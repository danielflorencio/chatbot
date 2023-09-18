import { Request, Response } from "express"
import models from "../models/models"
const User = models.User
const Conversation = models.Conversation
const Customer = models.Customer

export const newConversation = async (req: Request, res: Response) => {
    try{
        const user = await User.findOne({
            email: req.body.adminReference
        })
        if(user){
            const customer = await Customer.create({
                phoneNumber: req.body.newConversationPhoneNumber
            })
            const conversation = await Conversation.create({
                messages: [],
                adminId: user._id,
                customerId: customer._id        
            })
        }
        res.status(200).json({status: 'ok'})
    }catch(error){
        console.error('Error while trying to create a new conversation: ', error)
        res.status(500).json({status: 'error', message: 'error while creating customer/conversation.'})
    }
};