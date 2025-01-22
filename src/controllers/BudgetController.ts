import type { Request, Response } from "express"
import Budget from "../models/Budget"

export class BudgetControler {
    static getAll = async (req: Request, res: Response) => {
        try {
            const budgets = await Budget.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                // TODO: Filter by user
            })

            res.json(budgets)
        } catch (error) {
            // console.log(error)
            res.status(500).json({error: "Something broke"})
        }
    }
    
    static create = async (req: Request, res: Response) => {
        try {
            const budget = new Budget(req.body)
            await budget.save()
            res.status(201).json('Budget registered')

        } catch (error) {
            // console.log(error)
            res.status(500).json({error: "Something broke"})
        }
    }
    
    static getById = async (req: Request, res: Response) => {
        console.log('desde GET /api/budgets/id')
    }

    static updateById = async (req: Request, res: Response) => {
        console.log('desde PUT /api/budgets/id')
    }

    static deleteById = async (req: Request, res: Response) => {
        console.log('desde DELETE /api/budgets/id')
    }
}