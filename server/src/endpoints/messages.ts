import models from "../models/models";
import { Request, Response } from "express";

const User = models.User
const Conversation = models.Conversation;
const Message = models.Message;
const Customer = models.Customer

export const sendMessage = async (req: Request, res: Response) => {
    try{
        const user = await User.findOne({
            email: req.body.adminReference
        })
        const customer = await Customer.findOne({
            phoneNumber: req.body.customerReference
        })
        try{
            const newMessage = await Message.create({
                content: req.body.content,
                senderType: req.body.senderType,
                adminReference: user?.id,
                customerReference: customer?.id,
                date: req.body.date
            })
            try{
                const newConversation = await Conversation.findOneAndUpdate(
                    {adminId: user?._id, customerId: customer?._id}, 
                    { $push: { messages: newMessage._id } })
            } catch(error){
                res.json({status: 'error', message: 'error when updating the conversation.'})
            }
            res.json({status: 'ok', message: 'message created.'})
        } catch(error){
            res.json({status: 'Error', message: error})
        }
    } catch(error){
        res.json({status: 'error'})
    }
};

export const loadMessages = async (req: Request, res: Response) => {
    try{
        // const { email } = req.params;
        const user = await User.findOne({email: req.query.email})
        if(user){
            const conversationsIndexes = await Conversation.find({adminId: user._id})
            const customerIds = conversationsIndexes.map((conversationIndex) => conversationIndex.customerId)
            let response = await Promise.all(conversationsIndexes.map(async (conversation, index) => ({
                messages: await Message.find({ adminReference: user._id, customerReference: customerIds[index]}),
                adminId: req.query.email,
                customerId: await Customer.findOne({ _id: customerIds[index]}).select({phoneNumber: 1, _id: 0})
            })))
            res.status(200).json({status: 'ok', conversations: response});
        }
    }catch(error){
        res.status(500).json({status: 'error'})
    }
};

