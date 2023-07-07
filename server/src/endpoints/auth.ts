import { Request, Response } from "express"
import models from "../models/models"
const jwt = require('jsonwebtoken') 
const User = models.User;

export const register = async (req: Request, res: Response) => {
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
};

export const login = async (req: Request, res: Response) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    console.log('USER FIRST INTERACTION: ', user)
    if (user) {
        const token = jwt.sign({
            name: user.firstName,
            email: user.email
        },'secretPass')
    
        user.token = token
        await user.save()
        console.log('USER SECOND INTERACTION: ', user)
        return res.json({status: 'ok', user: token})
    } else{
        return res.json({status: 'error', user: false})
    }
};