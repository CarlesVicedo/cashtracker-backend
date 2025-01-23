import { RequestHandler } from "express"
import { body, param, validationResult } from "express-validator"
import Expense from "../models/Expense"

declare global {
    namespace Express {
        interface Request {
            expense?: Expense
        }
    }
}

export const validateExpenseInput: RequestHandler = async (req, res, next) => {
    await body('name')
        .notEmpty().withMessage('Expense name is mandatory')
        .run(req)

    await body('amount')
        .notEmpty().withMessage('Expense amount is mandatory')
        .isNumeric().withMessage('Not valid amount')
        .custom(value => value > 0).withMessage('Expense must be higher than 0.')
        .run(req)
    next()
}

export const validateExpenseId: RequestHandler = async (req, res, next) => {
    await param('expenseId')
        .isInt()
        .custom(value => value > 0 )
        .withMessage('Not valid ID')
        .run(req)

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })

    } else {
        next()
    }
}

export const validateExpenseExists: RequestHandler = async (req, res, next) => {
    try {
        const { expenseId } = req.params
        const expense = await Expense.findByPk(expenseId)
        if(!expense) {
            const error = new Error('Expense not found')
            res.status(404).json({error: error.message})
            return
        }

        req.expense = expense

        next()

    } catch (error) {
        // console.log(error)
        res.status(500).json({error: "Something broke"})
    }
}