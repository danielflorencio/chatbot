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
        console.error('Error while trying to register: ', error)
        res.json({status: 'error', error: 'Duplicate email'})
    }    
};

export const login = async (req: Request, res: Response) => {
    try{
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        if (user) {
            const token = jwt.sign({
                name: user.firstName,
                email: user.email
            },'secretPass')
            user.token = token
            await user.save()
            return res.json({status: 'ok', user: token})
        }
    }catch(error){
        console.error('Error while trying to login: ', error)
        return res.json({status: 'error', user: false, error: error})
    }
};

export const verifyStatus = async (req: Request, res: Response) => {
    try{
        const decodedToken = await jwt.decode( req.body.token, 'secretPass')
        const userEmail = decodedToken.email
        const user = await User.findOne({
            email: userEmail
        })
        console.log('user found: ', user)
        if(user){
            res.json({status: 'ok', token: decodedToken, userEmail: user.email})
        } else {
            res.json({status: 'error', error: 'User not found'})
        }
    }catch(error){
        console.error('Error while trying to verify status.', error)
        res.json({status: 'error', error: 'Could not decode the token.'})
    }    
};