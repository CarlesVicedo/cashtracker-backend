import type { Request, Response } from "express"

export class AuthControler {
    static createAccount = async (req: Request, res: Response) => {
        res.json('Creating account...')
    }
}