import type { Request, Response } from "express"
import Budget from "../models/Budget"
import Expense from "../models/Expense"

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
        const budget = await Budget.findByPk(req.budget.id, {
            include: [Expense]
        })
        res.json(budget)
    }

    static updateById = async (req: Request, res: Response) => {
        await req.budget.update(req.body)
        res.json('Budget updated')
    }

    static deleteById = async (req: Request, res: Response) => {
        await req.budget.destroy()
        res.json('Budget deleted')
    }
}