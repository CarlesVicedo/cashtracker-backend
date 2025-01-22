import type { Request, Response } from "express"

export class BudgetControler {
    static getAll = async (req: Request, res: Response) => {
        console.log('desde /api/budgets')
    }
    
    static create = async (req: Request, res: Response) => {
        console.log('desde POST /api/budgets')
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