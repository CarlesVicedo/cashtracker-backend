import type { Request, Response } from "express"
import User from "../models/User"

export class AuthControler {
    static createAccount = async (req: Request, res: Response) => {
        const { email } = req.body
        
        const userExists = await User.findOne({where: { email }})

        if(userExists) {
            const error = new Error('A user with this email already exists')
            res.status(409).json({error: error.message})
        }

        try {
            const user = new User(req.body)
            await user.save()
            res.json('Account created')

        } catch (error) {
            res.status(500).json({error: 'Something broke'})
        }
    }
}