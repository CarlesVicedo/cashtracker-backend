import type { Request, Response } from "express"
import User from "../models/User"

export class AuthControler {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const user = new User(req.body)
            await user.save()
            res.json('Account created')
            
        } catch (error) {
            res.status(500).json({error: 'Something broke'})
        }
    }
}